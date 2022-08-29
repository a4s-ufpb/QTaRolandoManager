import { UserModel } from './../../models/UserModel';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
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

  currentUser!: UserModel;
  roles: string[] = [];
  isLoggedIn = false;
  showEventsPanel: boolean = false;
  showUsersPanel: boolean = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private location: Location,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.getCurrentPage();

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.currentUser = this.storageService.getUser();
      this.roles = this.currentUser.roles;

      this.showUsersPanel = this.roles.includes('ROLE_ADMIN');
      this.showEventsPanel = this.roles.includes('ROLE_USER');
    }
  }

  getCurrentPage(): void {
    this.router.events.subscribe((_) => {
      this.routerPath = this.location.path();
      if (this.location.path().includes('/login')) {
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

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
