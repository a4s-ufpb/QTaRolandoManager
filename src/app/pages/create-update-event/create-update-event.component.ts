import { Location } from '@angular/common';
import { EventModel } from './../../models/EventModel';
import { Category } from './../../models/Category';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriesEnum } from 'src/app/utils/constants';
import { getCategories, getModalities } from 'src/app/utils/helpers';
import { EventsService } from 'src/app/services/events.service';

import Quill from 'quill';
import { ImageFormats } from '@xeger/quill-image-formats';
import { ImageActions } from '@xeger/quill-image-actions';
import { ActivatedRoute, Router } from '@angular/router';
Quill.register('modules/imageFormats', ImageFormats);
Quill.register('modules/imageActions', ImageActions);

@Component({
  selector: 'app-create-update-event',
  templateUrl: './create-update-event.component.html',
  styleUrls: ['./create-update-event.component.css']
})
export class CreateUpdateEventComponent implements OnInit {

  formats = [
    "align",
    "background",
    "blockquote",
    "bold",
    "code-block",
    "color",
    "float",
    "font",
    "header",
    "height",
    "image",
    "italic",
    "link",
    "script",
    "strike",
    "size",
    "underline",
    "width",
    "video",
    'list',
  ];

  modules = {
    imageActions: {},
    imageFormats: {}
  }

  bannerUrl: any;
  selectedCategories: number[] = [];
  selectedModality: String = "Selecionar modalidade";
  selectedDates: Date[] | null[] = [null, null];

  eventFormGroup: FormGroup;

  invalidFileType: Boolean = false;
  invalidFileSize: Boolean = false;

  showCategories: Boolean = false;
  showModalities: Boolean = false;

  categories = getCategories();
  modalities = getModalities();

  isUpdate: boolean = false;
  submitted: boolean = false;

  showModal: boolean = false;

  closeModal = () => { this.showModal = false; }
  cancelModal = () => { this.router.navigate(['dashboard/eventos/view']); }

  get form() {
    return this.eventFormGroup.controls;
  }

  constructor(fb: FormBuilder, private service: EventsService, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.eventFormGroup = fb.group(
      {
        title: new FormControl('', [Validators.required]),
        subtitle: new FormControl(''),
        description: new FormControl('', [Validators.required]),
        location: new FormControl(''),
        site: new FormControl(''),
      }
    )

    if (this.route.snapshot.params['id']) {
      this.isUpdate = true;
      this.service.getById(this.route.snapshot.params['id']).subscribe((event: EventModel) => {
        this.eventFormGroup.get('title')?.setValue(event.title);
        this.eventFormGroup.get('subtitle')?.setValue(event.subtitle);
        this.eventFormGroup.get('description')?.setValue(event.description);
        this.eventFormGroup.get('location')?.setValue(event.location);
        this.eventFormGroup.get('site')?.setValue(event.site);

        this.bannerUrl = event.imagePath;
        event.categories.forEach(category => this.selectedCategories.push(category.id));
        this.selectedModality = event.modality.charAt(0).toUpperCase() + event.modality.slice(1).toLowerCase();
        this.selectedDates = [event.initialDate, event.finalDate];
      });
    }

  }

  ngOnInit(): void {
    this.configureDropZone();
  }

  showMenu(isCategories: boolean): void {
    if (isCategories) {
      this.showCategories = !this.showCategories;
      this.showModalities = false;
    } else {
      this.showModalities = !this.showModalities;
      this.showCategories = false;
    }
  }

  selectCategory(category: string) {
    const categoryIndex = Object.values(CategoriesEnum).indexOf(category as unknown as CategoriesEnum);

    if (!this.selectedCategories.includes(categoryIndex)) {
      this.selectedCategories.push(categoryIndex);
    }

    else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(categoryIndex), 1);
    }
  }

  selectModality(modality: string) {
    this.selectedModality = modality;
    this.form['site'].setValue('');
    this.form['location'].setValue('');
    this.showModalities = false;
  }

  checkCategorySelected(category: string): boolean {
    const categoryIndex = Object.values(CategoriesEnum).indexOf(category as unknown as CategoriesEnum);

    return this.selectedCategories.includes(categoryIndex);
  }

  checkModalitySelected(modality: string): boolean {
    return this.selectedModality === modality;
  }

  searchImage(): void {
    var inputFile = document.getElementById('fileSelectorInput') as HTMLInputElement;
    inputFile.click();
    var file = null;
    var validate = (e: any) => this.validateFile(e);

    inputFile.addEventListener('change', function () {
      file = this.files![0];
      validate(file);
    });
  }

  removeImage(): void {
    this.bannerUrl = null;
    this.invalidFileSize = false;
    this.invalidFileType = false;
  }

  configureDropZone(): void {
    var dropzone = document.getElementById('dropzone') as HTMLDivElement;

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      var file = e.dataTransfer?.files[0];
      this.validateFile(file);
    });
  }

  validateFile(file: any): void {
    let fileType = file?.type;
    let fileSize = file?.size;
    let fileMb = fileSize / 1024 ** 2;

    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    this.invalidFileType = !validExtensions.includes(fileType!);
    this.invalidFileSize = !(fileMb < 2);

    if (!this.invalidFileSize && !this.invalidFileType) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        this.bannerUrl = fileReader.result;
      }
      fileReader.readAsDataURL(file!);
    }
  }

  hasError(field: string) {
    return this.eventFormGroup.get(field)?.errors;
  }

  onCancel(): void {
    this.location.back();
  }

  validateForm(): boolean {
    return this.eventFormGroup.valid &&
      !this.allAreNull(this.selectedDates) &&
      this.selectedCategories.length > 0 &&
      (this.form['location'].value != '' || this.form['site'].value != '');
  }

  allAreNull(arr: any[]) {
    return arr.every(element => element === null);
  }

  resetInputs(): void {
    this.submitted = false;
    this.eventFormGroup.reset();
    this.selectedCategories = [];
    this.selectedDates = [null, null];
    this.selectedModality = "Selecionar modalidade";
    this.bannerUrl = null;
  }

  onSubmit(): void {
    this.submitted = true;
    var userTimezoneOffset = new Date().getTimezoneOffset() * 60000;

    if (this.validateForm()) {
      let categoriesObj: Category[] = [];
      this.selectedCategories.forEach(index => {
        categoriesObj.push(({ id: index, name: Object.values(CategoriesEnum)[index] }));
      });

      let event: EventModel = ({
        title: this.form['title'].value,
        subtitle: this.form['subtitle'].value,
        categories: categoriesObj,
        description: this.form['description'].value,
        initialDate: new Date(this.selectedDates[0]!.getTime() - userTimezoneOffset),
        finalDate: new Date(this.selectedDates[1]!.getTime() - userTimezoneOffset),
        imagePath: this.bannerUrl,
        modality: this.selectedModality.toUpperCase(),
        location: this.form['location'].value,
        site: this.form['site'].value,
      });

      if (this.isUpdate) {
        this.service.update(this.route.snapshot.params['id'], event).subscribe({
          next: (data) => console.log('success'),
          error: (err) => console.log(err),
          complete: () => {
            this.showModal = true;
          }
        });
      } else {
        this.service.create(event).subscribe({
          next: (data) => console.log('success'),
          error: (err) => console.log(err),
          complete: () => {
            this.showModal = true;
            this.resetInputs();
          }
        });
      }
    }
  }

}
