import { UserModel } from './../../models/UserModel';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
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
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.currentUser = this.storageService.getUser();
      this.roles = this.currentUser.roles;

      this.showUsersPanel = this.roles.includes('ROLE_ADMIN');
      this.showEventsPanel = this.roles.includes('ROLE_USER');
    }
  }

  menuToggle(): void {
    this.menuActive = !this.menuActive;
  }

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
