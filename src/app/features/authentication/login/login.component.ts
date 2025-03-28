import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink, CommonModule, ReactiveFormsModule ],
    template: `
  <div class="container mx-auto">
    <div class="w-[480px] bg-gradient-to-br from-blue-900 to-yellow-500 rounded-lg shadow-xl overflow-hidden m-auto">
        <div class="p-8">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-white mb-2">Morocco Adventures</h1>
                <p class="text-white/80 text-sm">Sign in to reserve your next Moroccan adventure</p>
            </div>
          
            <div class="bg-white/20 bg-opacity-10 backdrop-blur-sm  rounded-lg p-6 border border-white/20">
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                    <div class="mb-4">
                        <label for="email" class="block text-white text-sm font-medium mb-1">Email</label>
                        <div class="relative">
                            <span
                                class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                            >
                                mail
                            </span>
                            <input
                                type="email"
                                formControlName="email"
                                id="email"
                                class="w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                placeholder="Your email address"
                                required=""
                            />
                        </div>
                        <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid" class="text-red-700 text-sm mt-1">
                          <div *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</div>
                          <div *ngIf="loginForm.get('email')?.errors?.['email']">Enter a valid email</div>
                        </div>
                    </div>
                    <div class="mb-6">
                        <div class="flex items-center justify-between mb-1">
                            <label for="password" class="block text-white text-sm font-medium">Password</label>
                            <a
                                href="#"
                                class="text-xs text-white/70 hover:text-white transition-colors duration-300"
                                >Forgot password?</a
                            >
                        </div>
                        <div class="relative">
                            <span
                                class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                            >
                                lock
                            </span>
                            <input
                                type="password"
                                id="password"
                                formControlName="password"
                                class="w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                placeholder="Your password"
                                required=""
                            />
                        </div>
                        <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" class="text-red-700 text-sm mt-1">
                          <div *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</div>
                        </div>
                    </div>
                  
                    <button
                          type="submit"
                          [disabled]="loginForm.invalid || loading"
                          class="w-full bg-blue-900 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Sign In
                    </button>
                </form>
            </div>
            <div class="mt-6 text-center">
                <p class="text-white/80 text-sm">
                    Don&#x27;t have an account?
                    <a routerLink="/authentication/register" class="text-white font-medium ml-1 hover:underline transition-all duration-300"
                        >Register now</a
                    >
                </p>
            </div>
        </div>
    </div>
  </div>
`,
    styles: ``
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  email: string = '';
  password: string = '';
  

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
){
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
}

  onSubmit(): void{

    const credentials = this.loginForm.value;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.toastService.success('Login Successful', 'Welcome');
        const userRole = this.authService.getUserRole();
        if (userRole === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (userRole === 'ROLE_TOURIST') {
          this.router.navigate(['/']);
        } else if (userRole === 'ROLE_GUIDE') {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Unknown role. Access denied.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred during login check your credentials';
        this.toastService.error('Login Failed', this.errorMessage);
      }
    });
  }
}
