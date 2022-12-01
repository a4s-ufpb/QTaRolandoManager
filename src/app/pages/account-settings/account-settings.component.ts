import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  isEditName: boolean = false;
  isEditEmail: boolean = false;
  isEditPassword: boolean = false;

  currentUser!: UserModel;
  accountFormGroup: FormGroup;

  constructor(fb: FormBuilder, storageService: StorageService) {
    this.currentUser = storageService.getUser();
    this.accountFormGroup = fb.group(
      {
        name: new FormControl(this.currentUser.username, Validators.required),
        email: new FormControl(this.currentUser.email, Validators.required),
        password: new FormControl('1234578', Validators.required),
      }
    )

    this.accountFormGroup.get('name')?.disable();
    this.accountFormGroup.get('email')?.disable();
    this.accountFormGroup.get('password')?.disable();
  }

  ngOnInit(): void {
  }

  changeInput(input: string): void {
    switch (input) {
      case 'name':
        this.isEditName = !this.isEditName
        break;
      case 'email':
        this.isEditEmail = !this.isEditEmail;
        break;
      case 'password':
        this.isEditPassword = !this.isEditPassword
        break;
    }

    !this.isEditName ? this.accountFormGroup.get('name')?.disable() : this.accountFormGroup.get('name')?.enable();
    !this.isEditEmail ? this.accountFormGroup.get('email')?.disable() : this.accountFormGroup.get('email')?.enable();
    if (!this.isEditPassword) {
      this.accountFormGroup.get('password')?.disable();
      this.accountFormGroup.get('password')?.setValue('12345678');
    } else {
      this.accountFormGroup.get('password')?.enable();
      this.accountFormGroup.get('password')?.setValue('');
    }
  }

}
