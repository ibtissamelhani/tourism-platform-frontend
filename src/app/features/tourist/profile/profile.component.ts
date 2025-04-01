import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';
import { UpdateUser, UserResponse } from '../../../core/models/User';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  template: `
  <app-navbar/>
  <div class="h-screen p-8  bg-blue-900/15">
  <div class="text-center mb-12 mt-16">
        <h1 class="text-4xl font-bold text-blue-900 mb-4">Profile Management</h1>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-900 to-yellow-600 mx-auto mb-6"></div>
    </div>
    <div class="max-w-xl mx-auto mt-16 bg-white p-8 shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">
        My Profile
      </h2>

      <form
        *ngIf="!loading"
        [formGroup]="profileForm"
        (ngSubmit)="onSubmit()"
        class="space-y-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >First Name</label
            >
            <input
              formControlName="firstName"
              type="text"
              class="form-input w-full"
            />
            <p
              *ngIf="
                profileForm.get('firstName')?.invalid &&
                profileForm.get('firstName')?.touched
              "
              class="text-red-500 text-xs mt-1"
            >
              First name is required
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Last Name</label
            >
            <input
              formControlName="lastName"
              type="text"
              class="form-input w-full"
            />
            <p
              *ngIf="
                profileForm.get('lastName')?.invalid &&
                profileForm.get('lastName')?.touched
              "
              class="text-red-500 text-xs mt-1"
            >
              Last name is required
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            formControlName="email"
            type="email"
            class="form-input w-full"
          />
          <p
            *ngIf="
              profileForm.get('email')?.invalid &&
              profileForm.get('email')?.touched
            "
            class="text-red-500 text-xs mt-1"
          >
            Enter a valid email
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Phone Number</label
          >
          <input
            formControlName="phoneNumber"
            type="tel"
            class="form-input w-full"
          />
          <p
            *ngIf="
              profileForm.get('phoneNumber')?.invalid &&
              profileForm.get('phoneNumber')?.touched
            "
            class="text-red-500 text-xs mt-1"
          >
            Valid phone required (10-15 digits)
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="profileForm.invalid"
        >
          Update Profile
        </button>
      </form>

      <div *ngIf="loading" class="text-center text-gray-500">
        Loading profile...
      </div>
    </div>
  </div>
  `,
  styles: ``,
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loading = true;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private authService: AuthService
  ) {}



  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId()!;
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: UserResponse) => {
          this.loading = false;
          this.profileForm = this.fb.group({
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            phoneNumber: [user.phoneNumber, [
              Validators.pattern(/^\+?[0-9]{10,15}$/)
            ]]
          });
        },
        error: (err) => {
          this.toast.error('Failed to load user:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const data: Partial<UpdateUser> = this.profileForm.value;
      this.userService.updateUser(this.userId, data).subscribe({
        next: () => {
          this.toast.success('success','Profile updated successfully!');
          this.profileForm.reset();
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
          this.toast.error('error','Failed to update profile!');
        }
      });
    }
  }
}

