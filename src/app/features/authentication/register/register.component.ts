import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  imports: [ 
    RouterLink,
    ReactiveFormsModule, 
    CommonModule
  ],
  template: `
    <div class = "container mx-auto  p-7.5 flex justify-center">
      <div class = "w-[700px] bg-gradient-to-br from-blue-900 to-yellow-500 rounded-lg shadow-xl overflow-hidden">
        <div class = "p-8">
          <div class = "text-center mb-8">
            <h1 class = "text-3xl font-bold text-white mb-2">DadesAdventures</h1>
            <p class = "text-white/80 text-sm">Create an account to explore Moroccan destinations</p>
          </div>

          <div class = "bg-white/20 bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <div class = "grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" class = "block text-white text-sm font-medium mb-1">First Name</label>
                  <div class = "relative">
                  <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                    person
                  </span>
                    <input
                      type="text"
                      id="firstName"
                      formControlName="firstName"
                      class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div *ngIf="registerForm.get('firstName')?.touched && registerForm.get('firstName')?.invalid" class="text-red-600 text-sm mt-1">
                    <div *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</div>
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" class = "block text-white text-sm font-medium mb-1">Last Name</label>
                  <div class = "relative">
                  <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                    badge
                  </span>
                    <input
                      type="text"
                      id="lastName"
                      formControlName="lastName"
                      class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="Last name"
                      required
                    />
                  </div>
                  <div *ngIf="registerForm.get('lastName')?.touched && registerForm.get('lastName')?.invalid" class="text-red-500 text-sm mt-1">
                    <div *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</div>
                  </div>
                </div>
              </div>

              <div class = "grid grid-cols-2 gap-4 mb-4">
              <div >
                <label htmlFor="email" class = "block text-white text-sm font-medium mb-1">Email</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  mail
                </span>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="text-red-500 text-sm mt-1">
                  <div *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</div>
                  <div *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email address</div>
                </div>

              </div>

              <div class >
                <label htmlFor="phone" class = "block text-white text-sm font-medium mb-1">Phone Number</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  phone
                </span>
                  <input
                    type="tel"
                    id="phone"
                    formControlName="phoneNumber"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div *ngIf="registerForm.get('phoneNumber')?.touched && registerForm.get('phoneNumber')?.invalid" class="text-red-500 text-sm mt-1">
                  <div *ngIf="registerForm.get('phoneNumber')?.errors?.['required']">Phone number is required</div>
                  <div *ngIf="registerForm.get('phoneNumber')?.errors?.['pattern']">
                    Phone number must be between 10 and 15 digits and can start with a '+'
                  </div>
                </div>
              </div>
              </div>

              <div class = "grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="password" class = "block text-white text-sm font-medium mb-1">Password</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  lock
                </span>
                  <input
                    type="password"
                    id="password"
                    formControlName="password"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="text-red-600 text-sm mt-1">
                  <div *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</div>
                  <div *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</div>
                  <div *ngIf="registerForm.get('password')?.errors?.['pattern']">
                    Password must contain at least one uppercase letter, one lowercase letter, and one number
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" class = "block text-white text-sm font-medium mb-1">Confirm Password</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  lock_reset
                </span>
                  <input
                    type="password"
                    id="confirmPassword"
                    formControlName="confirmPassword"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <div *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.get('confirmPassword')?.invalid" class="text-red-500 text-sm mt-1">
                  <div *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</div>
                </div>
                <div *ngIf="registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched" class="text-red-500 text-sm mt-1">
                  Passwords do not match
                </div>
              </div>
              </div>
              <div class = "flex items-end justify-between">
              
              <button
                  type="submit"
                  [disabled]="registerForm.invalid || isLoading"
                  class="w-1/2 bg-blue-900 hover:bg-opacity-90 active:bg-opacity-80 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span *ngIf="isLoading">Creating Account...</span>
                  <span *ngIf="!isLoading">Create Account</span>
                </button>
              <p class = "text-white/80 text-sm">
              Already have an account?
              <a routerLink="/authentication/login" class = "text-white font-medium ml-1 hover:underline transition-all duration-300">Sign in</a>
            </p>
              </div>
            </form>
          </div>          
        </div>
      </div>
    </div>
    `,
  styles: ``
})
export class RegisterComponent {

  registerForm!: FormGroup;
  formSubmitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matching: true });
      return { matching: true };
    }
    return null;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const registerData = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/authentication/login']);
        this.toastService.success('Registration Successful', 'Please log in.');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        this.toastService.error('register Failed', this.errorMessage);
      }
    });
  }
}
