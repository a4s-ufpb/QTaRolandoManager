import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PagesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() page!: PagesEnum;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }



  toggleMenu() {
    const sidebar = document?.querySelector(".sidebar");
    sidebar?.classList.toggle("close")
  }

}
