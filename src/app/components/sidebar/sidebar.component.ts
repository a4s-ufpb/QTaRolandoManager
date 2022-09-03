import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() routerPath!: string;

  currentUser!: UserModel;
  roles: string[] = [];
  showUsersOptions: boolean = false;

  constructor(private storageService: StorageService,) { }

  ngOnInit(): void {
    console.log(this.routerPath);
    this.showMenu('nav-toggle', 'navbar');

    if (this.storageService.isLoggedIn()) {
      this.currentUser = this.storageService.getUser();
      this.roles = this.currentUser.roles;

      this.showUsersOptions = this.roles.includes('ROLE_ADMIN');
    }
  }

  showMenu(toggleId: string, navId: string): void {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        if (toggle.classList.contains('eva-menu-outline')) {
          toggle.classList.add('eva-close-outline');
          toggle.classList.remove('eva-menu-outline');
        } else {
          toggle.classList.add('eva-menu-outline');
          toggle.classList.remove('eva-close-outline');
        }
      });
    }
  }

  containsRouterPath(path: string): boolean {
    return this.routerPath.includes(path);
  }

}
