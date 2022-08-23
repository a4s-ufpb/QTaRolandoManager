import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  routerPath: string = "";
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
      this.routerPath = this.location.path();
      if (this.location.path() == '/login') {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    });
  }

  checkPathIsEqual(path: string): boolean {
    return this.routerPath == path;
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
