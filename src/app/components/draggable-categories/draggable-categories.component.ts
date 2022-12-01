import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { getCategories } from 'src/app/utils/helpers';

@Component({
  selector: 'app-draggable-categories',
  templateUrl: './draggable-categories.component.html',
  styleUrls: ['./draggable-categories.component.css']
})
export class DraggableCategoriesComponent implements AfterViewInit {

  @Input()
  selectedCategory: string;

  @Input()
  onSelectCategory!: (category: string) => void;

  categories = getCategories();

  constructor() {
    this.selectedCategory = this.categories[0];
  }

  ngAfterViewInit(): void {
    const tabsBox = document.querySelector(".wrapper .tabs-box") as HTMLUListElement;
    const arrowIcons = document.querySelectorAll(".icon-arrow i.eva") as NodeListOf<HTMLElement>;

    let isDragging = false;

    const handleIcons = () => {
      let scrollVal = Math.round(tabsBox.scrollLeft);
      let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
      arrowIcons[0].parentElement!.style.display = scrollVal > 0 ? "flex" : "none";
      arrowIcons[1].parentElement!.style.display = maxScrollableWidth > scrollVal ? "flex" : "none";
    }

    arrowIcons!.forEach(icon => {
      icon.addEventListener("click", () => {
        tabsBox.scrollLeft += icon.id == "left" ? -350 : 350;
        setTimeout(() => {
          handleIcons();
        }, 50);
        setTimeout(() => {
          handleIcons();
        }, 350);
      })
    });

    const dragging = (e: MouseEvent) => {
      if (!isDragging) return;
      tabsBox.classList.add("dragging");
      tabsBox.scrollLeft -= e.movementX;
      handleIcons();
    }

    const dragStop = () => {
      isDragging = false;
      tabsBox.classList.remove("dragging");
    }

    tabsBox.addEventListener("mousedown", () => isDragging = true);
    tabsBox.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  }

}
