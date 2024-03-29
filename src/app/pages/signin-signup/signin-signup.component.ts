import { EncryptHelper } from './../../services/rsa.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserRequestModel } from 'src/app/models/UserRequestModel';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css']
})
export class SigninSignupComponent implements OnInit {
  submitted = false;
  working = false;
  complete = false;
  strongPassword = false;
  isLogin: Boolean = true;

  showPassword: boolean = false;

  errorMessage: string = "";
  isAdmin?: boolean;
  isLogged: Boolean = false;
  roles: string[] = [];

  signInForm = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.minLength(8),
      Validators.required,
    ]),
    checkbox: new FormControl(null)
  });
  signUpForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.minLength(8),
      Validators.required,
    ]),
    checkbox: new FormControl(null, [Validators.required])
  });

  get f() {
    return this.isLogin ? this.signInForm.controls : this.signUpForm.controls;
  }

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rsaHelper: EncryptHelper
  ) {
    this.activatedRoute.queryParams.subscribe(obs => {
      this.isLogin = obs['type'] == 'signIn';
      this.submitted = false;
      this.showPassword = false;
    });
  }

  ngOnInit(): void {
    const inputs = document.querySelectorAll(".input-field") as NodeListOf<HTMLInputElement>;

    inputs.forEach(inp => {
      inp.oninput = function () {
        if (inp.value != "") inp.classList.add("active");
      };
      inp.addEventListener("focus", () => {
        if (inp.classList.contains("active")) return;
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
      });
    });

    const bullets = document.querySelectorAll(".bullets span") as NodeListOf<HTMLSpanElement>;
    const images = document.querySelectorAll(".image") as NodeListOf<HTMLImageElement>;

    bullets.forEach(bullet => {
      bullet.addEventListener("click", () => {
        let index = bullet.dataset['value'];

        let currentImage = document.querySelector(`.img-${index}`);
        images.forEach((img) => img.classList.remove("show"));
        currentImage?.classList.add("show");

        const textSlider = document.querySelector(".text-group") as HTMLDivElement;
        textSlider.style.transform = `translateY(${-(Number(index) - 1) * 2.2}rem)`;

        bullets.forEach(bull => bull.classList.remove("active"));
        bullet.classList.add("active");
      });
    });
  }

  changeQueryParams(): void {
    const queryParams: Params = { type: !this.isLogin ? 'signIn' : 'signUp' };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
  }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.isLogin) {
      if (this.signUpForm.invalid || this.signUpForm.controls.checkbox.value == false) {
        return;
      }
      else {
        this.register();
      }
    } else if (this.isLogin) {
      if (this.signInForm.invalid) {
        return;
      }
      else {
        this.login();
      }
    }
  }

  register(): void {
    const user: UserRequestModel = ({
      username: this.signUpForm.controls.name.value!,
      email: this.signUpForm.controls.email.value!,
      password: this.rsaHelper.encryptWithPublicKey(this.signUpForm.controls.password.value!),
      roles: [],
    });
    this.authService.register(user).subscribe({
      next: (data) => {
        console.log(data);
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
      complete: () => {
        this.changeQueryParams();
        // Ajustar para quando for possível que qualquer usuário possa fazer login, onde será feito o login automáticamente
        // this.login(user.email, user.password);
      }
    });
  }

  login(email?: string, password?: string): void {
    this.authService.login(
      email ?? this.signInForm.controls.email.value!,
      password ?? this.rsaHelper.encryptWithPublicKey(this.signInForm.controls.password.value!)
    ).subscribe({
      next: (data) => {
        // Ajustar para quando for possível que qualquer usuário possa fazer login, onde será feito o login automáticamente
        if (data.roles.includes('ROLE_ADMIN')) {
          this.storageService.saveUser(data);

          this.errorMessage = "";
          this.isAdmin = true;
          this.isLogged = true;
          this.roles = this.storageService.getUser().roles;
          this.router.navigate(['/eventos']);
        } else {
          this.isAdmin = false;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
      complete: () => {
        this.signInForm.reset();
        this.signUpForm.reset();
      }
    });
  }

}
