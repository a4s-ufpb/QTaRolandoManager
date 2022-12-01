import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {

  @Input() width!: string;
  @Input() height!: string;
  @Input() fontSize: string = '1rem';

  isLoggedIn = false;
  currentUser!: UserModel;
  nameInitials: string = "QT";
  color: string = "#5f9ea0";

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.currentUser = this.storageService.getUser();

      this.nameInitials = this.currentUser.username.split(' ').map(x => x.charAt(0)).join('').substring(0, 2).toUpperCase();
      this.createColorByName();
    }
  }

  createColorByName() {
    const charCodeRed = this.nameInitials.charCodeAt(0);
    const charCodeGreen = this.nameInitials.charCodeAt(1) || charCodeRed;

    const red = Math.pow(charCodeRed, 7) % 200;
    const green = Math.pow(charCodeGreen, 7) % 200;
    const blue = (red + green) % 200;

    this.color = `rgb(${red}, ${green}, ${blue})`;
  }

}
