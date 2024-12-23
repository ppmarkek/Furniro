import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  auth = inject(AuthService);
  error = signal('');
  success = signal('');
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const repeatPassword = formGroup.get('repeatPassword');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      repeatPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (repeatPassword?.hasError('passwordMismatch')) {
        repeatPassword.setErrors(null);
      }
      return null;
    }
  };

  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get repeatPassword() {
    return this.signupForm.get('repeatPassword');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      this.auth
        .singup(
          formValues as {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        )
        .subscribe({
          next: () => {
            this.success.set('Successful registration!');
            this.signupForm.reset();
            this.error.set('');
          },
          error: (error) => {
            if (error.status === 400) {
              this.error.set('This email is already in use!');
            } else {
              this.error.set('Network error!');
            }
            this.success.set('');
            console.error(error);
          },
        });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
