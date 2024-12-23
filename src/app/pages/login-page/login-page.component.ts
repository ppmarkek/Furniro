import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  auth = inject(AuthService);
  router = inject(Router);
  error = signal('');
  form = new FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth
        .login(this.form.value as { email: string; password: string })
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (error) => {
            this.error.set(error);
            console.error(error);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
