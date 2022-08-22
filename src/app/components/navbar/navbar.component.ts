import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoginPage: boolean = false;

  menuActive: boolean = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.getCurrentPage();
  }

  getCurrentPage(): void {
    this.router.events.subscribe((_) => {
      if (this.location.path() == '/login') {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    });
  }

  menuToggle(): void {
    this.menuActive = !this.menuActive;
  }

  // @HostListener('document:mousedown', ['$event'])
  // onGlobalClick(event: { target: any; }): void {
  //   if (!this.toggleButton.nativeElement.contains(event.target) && !this.menu.nativeElement.contains(event.target)) {
  //     this.menuActive = false;
  //   }
  // }

  isLogged(): boolean {
    return false;
  }

}
