import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import User from '../../models/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  inputPWType: string = 'password';
  loginForm: FormGroup; // Represente mon formulaire <form>
  formBuilder: FormBuilder = inject(FormBuilder);
  userService: UserService = inject(UserService);
  constructor() {
    // Création du formGroup
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePW() {
    if (this.inputPWType === 'password') {
      this.inputPWType = 'text';
    } else {
      this.inputPWType = 'password';
    }
  }
  monFormEstSoumis() {
    // console.log("MON FORM EST SOUMIS");
    // console.log("loginForm.valid ",this.loginForm.valid);
    // console.log("Toutes les valeurs des control du groupe -> loginForm.value ",this.loginForm.value);
    // console.log("Recuperer un seul control avec loginForm.get('email')",this.loginForm.get("password"));
    // console.log("Recuperer la validité d'un control avec loginForm.get('password').valid",this.loginForm.get("email")?.valid);
    // console.log("Recuperer les erreurs d'un control avec loginForm.get('password').errors",this.loginForm.get("password")?.errors);
    // console.log("Recuperer un seul control avec loginForm.get('password')",this.loginForm.get("password"));

    if (this.loginForm.valid) {
      console.log(
        "Form valide je peux envoyer la requete de login a l'api /auth"
      );
      // Appel de la méthode du service
      this.userService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          //Récupération du token
          console.log(data);
          // Stocker le token en localStorage

        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    }
  }
}
