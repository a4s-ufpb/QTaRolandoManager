import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  working = false;
  complete = false;
  strongPassword = false;
  isLogin: Boolean = true;
  formLogin!: FormGroup;
  urlBaseApi = environment.URL_BASE_API;
  isLogged: Boolean = false;

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

  constructor(private location: Location,
    private router: Router) {
  }

  ngOnInit(): void {
    const login = this.location.getState() as { isLogin: boolean };
    this.isLogin = login != null ? login.isLogin : true;
    // const login = this.route.snapshot.queryParamMap.get('isLogin');
    // console.log(login);
    // this.setOption(this.location.getState()['isLogin'] || false);
    // this.setOption(true)
    // this.createForm();
  }

  setOption(value: Boolean): void {
    this.isLogin = value;
    this.submitted = false;
    this.signUpForm.reset();
    this.signInForm.reset();
  }

  backButton() {
    this.location.back();
  }

  createForm() {
    this.formLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  getUsers() {
    // this.registerService.getUsers().subscribe( users => {
    //   console.log(users);
    //   return users;
    // });
  }


  login(email: string, password: string) {
    let login = {
      "email": email,
      "password": password
    }
    // this.registerService.loginPostApi(login).subscribe({
    //   next: (next) => {
    //     this.isLogged = true;
    //     delete next.password;
    //     localStorage.setItem('userCurrent', JSON.stringify(next));
    //     this.location.back();
    //   },
    //   error: (err) => {
    //     console.log(err.error);
    //   }
    // });
  }

  // registerUser(user: User) {
  //   // this.registerService.createUser(user).subscribe({
  //   //   next: () => {
  //   //     console.log("Usuário registrado!")
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err.error);
  //   //   }
  //   // });
  // }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.isLogin) {
      if (this.signUpForm.invalid) {
        console.log("cadastro inválido");
        return;
      }
      else {
        console.log("cadastro válido");
        this.router.navigate(['/dashboard/eventos']);
      }
    } else if (this.isLogin) {
      if (this.signInForm.invalid) {
        console.log("login inválido");
        return;
      }
      else {
        console.log("login válido");
        this.router.navigate(['/dashboard/eventos']);
      }
    }

    // if(this.isLogin) {
    //   this.login(this.formLogin.get('email').value, this.formLogin.get('password').value);
    //   if(this.isLogged) {
    //     this.formLogin.reset();
    //   }
    // } else {
    //   this.registerUser(this.formLogin.value);
    //   this.formLogin.reset();
    //   this.setOption(true);
    // }
  }

}
