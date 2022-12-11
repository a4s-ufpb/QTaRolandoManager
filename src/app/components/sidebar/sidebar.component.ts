import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @Input() routerPath!: string;

  currentUser!: UserModel;
  roles: string[] = [];
  showUsersOptions: boolean = false;

  collapseSidebar: boolean = false;

  sidebarIndex!: number;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void {
    // Configure shrink button
    const shrink_btn = document.querySelector(".shrink-btn") as HTMLSpanElement;
    const body = document.getElementById("body") as HTMLBodyElement;
    const search = document.querySelector(".search") as HTMLDivElement;

    shrink_btn.addEventListener("click", () => {
      body.classList.toggle("shrink");
    });

    if (window.innerWidth <= 1366) body.classList.toggle("shrink");

    // search.addEventListener("click", () => {
    //   body.classList.remove("shrink");
    //   let input = search.lastElementChild as HTMLInputElement;
    //   input.focus();
    // });

    // Configure Sidebar liks
    const sidebar_links = document.querySelectorAll(".sidebar-links a") as NodeListOf<HTMLLinkElement>;

    function changeLink(link: HTMLLinkElement) {
      sidebar_links.forEach(sideLink => sideLink.classList.remove("active"));
      link.classList.add("active");
    }

    sidebar_links.forEach(link => link.addEventListener("click", () => changeLink(link)));

    // Configure Tooltips
    const tooltip_elements = document.querySelectorAll(".tooltip-element") as NodeListOf<HTMLLIElement>;

    function showTooltip(elem: HTMLLIElement) {
      let tooltip = elem.parentNode?.lastElementChild as unknown as HTMLDivElement;
      let spans = tooltip?.children as unknown as NodeListOf<HTMLSpanElement>;
      let tooltipIndex = parseInt(elem.dataset['tooltip']!);

      Array.from(spans).forEach(sp => sp.classList.remove("show"));
      spans[tooltipIndex].classList.add("show");

      tooltip.style.top = `${100 / (spans.length * 2) * (tooltipIndex * 2 + 1)}%`
    }

    tooltip_elements.forEach(elem => {
      elem.addEventListener("mouseover", () => showTooltip(elem));
    });
  }

  ngOnInit(): void {
    this.scrollDetect();

    if (this.routerPath.includes('/dashboard/usuarios')) this.sidebarIndex = 0;
    if (this.routerPath.includes('/dashboard/eventos')) this.sidebarIndex = 1;
    if (this.routerPath.includes('/manager/criar-evento')) this.sidebarIndex = 2;
    if (this.routerPath.includes('/manager/editar-evento')) this.sidebarIndex = 3;

    if (this.storageService.isLoggedIn()) {
      this.currentUser = this.storageService.getUser();
      this.roles = this.currentUser.roles;

      this.showUsersOptions = this.roles.includes('ROLE_ADMIN');
    }
  }

  scrollDetect(): void {
    var lastScroll = 0;
    const header = document.getElementById('header');

    window.onscroll = function () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

      if (currentScroll > 0 && lastScroll <= currentScroll) {
        lastScroll = currentScroll;
        header?.classList.add('active');
      } else if (currentScroll == 0) {
        lastScroll = currentScroll;
        header?.classList.remove('active');
      }
    };
  }

  containsRouterPath(path: string): boolean {
    return this.routerPath.includes(path);
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const body = document.getElementById("body") as HTMLBodyElement;
    if (window.innerWidth > 1366) body.classList.remove("shrink");
    else body.classList.add("shrink");
  }
}
