import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { getCategories } from 'src/app/utils/helpers';

@Component({
  selector: 'app-scrollable-slider-tabs',
  templateUrl: './scrollable-slider-tabs.component.html',
  styleUrls: ['./scrollable-slider-tabs.component.css']
})
export class ScrollableSliderTabsComponent implements AfterViewInit {

  @ViewChild("tabsList")
  tabsList!: ElementRef;

  @ViewChild("leftArrowContainer")
  leftArrowContainer!: ElementRef;
  @ViewChild("rightArrowContainer")
  rightArrowContainer!: ElementRef;

  @ViewChild("leftArrow")
  leftArrow!: ElementRef;
  @ViewChild("rightArrow")
  rightArrow!: ElementRef;

  @Input()
  selectedCategory: string = '';

  @Input()
  onSelectCategory!: (category: string) => void;

  categories = getCategories();
  movementScroll: number = 200;

  constructor() { }

  ngAfterViewInit(): void {
    const manageIcons = () => {
      if (this.tabsList.nativeElement.scrollLeft >= 20) {
        this.leftArrowContainer.nativeElement.classList.add("active");
      } else {
        this.leftArrowContainer.nativeElement.classList.remove("active");
      }

      let maxScrollValue = this.tabsList.nativeElement.scrollWidth - this.tabsList.nativeElement.clientWidth - 20;

      if (this.tabsList.nativeElement.scrollLeft >= maxScrollValue) {
        this.rightArrowContainer.nativeElement.classList.remove("active");
      } else {
        this.rightArrowContainer.nativeElement.classList.add("active");
      }
    }

    this.rightArrow.nativeElement.addEventListener('click', () => {
      this.tabsList.nativeElement.scrollLeft += this.movementScroll;
      manageIcons();
    });
    this.leftArrow.nativeElement.addEventListener('click', () => {
      this.tabsList.nativeElement.scrollLeft -= this.movementScroll;
      manageIcons();
    });

    this.tabsList.nativeElement.addEventListener('scroll', manageIcons);
    this.tabsList.nativeElement.addEventListener('wheel', (e: any) => {
      console.log(e.deltaY);
      if (e.deltaY > 0) {
        this.tabsList.nativeElement.scrollLeft += this.movementScroll;
      } else {
        this.tabsList.nativeElement.scrollLeft -= this.movementScroll;
      }
      e.preventDefault();
      manageIcons();
    });

    let dragging = false;
    const drag = (e: any) => {
      if (!dragging) return;
      this.tabsList.nativeElement.classList.add("dragging");
      this.tabsList.nativeElement.scrollLeft -= e.movementX;
    }

    this.tabsList.nativeElement.addEventListener('mousedown', () => {
      dragging = true;
    });

    this.tabsList.nativeElement.addEventListener('mousemove', drag);

    document.addEventListener('mouseup', () => {
      dragging = false;
      this.tabsList.nativeElement.classList.remove("dragging");
    })
  }

}
