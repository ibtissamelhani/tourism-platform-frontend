import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequest } from '../../../../core/models/User';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
   <div class="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10 border border-gray-100">
  <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Add New Guide</h2>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div class="grid grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">First Name</label>
        <input 
          type="text" 
          formControlName="firstName" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="First name" 
        />
        <div *ngIf="form.get('firstName')?.invalid && form.get('firstName')?.touched" class="text-red-500 text-xs mt-1">
          First name is required
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Last Name</label>
        <input 
          type="text" 
          formControlName="lastName" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Last name" 
        />
        <div *ngIf="form.get('lastName')?.invalid && form.get('lastName')?.touched" class="text-red-500 text-xs mt-1">
          Last name is required
        </div>
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input 
        type="email" 
        formControlName="email" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder="Email address" 
      />
      <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="text-red-500 text-xs mt-1">
        Valid email is required
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input 
        type="password" 
        formControlName="password" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder="••••••••" 
      />
      <div *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="text-red-500 text-xs mt-1">
        Password must be at least 8 characters with uppercase, lowercase and number
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Phone Number</label>
      <input 
        type="text" 
        formControlName="phoneNumber" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder="Phone number" 
      />
      <div *ngIf="form.get('phoneNumber')?.invalid && form.get('phoneNumber')?.touched" class="text-red-500 text-xs mt-1">
        Valid phone number is required
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Status</label>
      <select 
        formControlName="isActive" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
      >
        <option [ngValue]="true">Active</option>
        <option [ngValue]="false">Inactive</option>
      </select>
    </div>

    <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-4">
      <button 
        type="button" 
        (click)="cancel()" 
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button 
        type="submit" 
        [disabled]="form.invalid" 
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Guide
      </button>
    </div>
  </form>
</div>
  `,
  styles: ``
})
export class UserAddComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{10,15}$/)
      ]],
      isActive: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newUser: UserRequest = {
        ...this.form.value,
        role: 'GUIDE' 
      };

      this.userService.createUser(newUser).subscribe({
        next: () => {
          this.toast.success('Success', 'Guide created successfully');
          this.router.navigate(['/admin/users']);
        },
        error: (err) => {
          const msg = err.error?.message || 'Failed to create guide';
          this.toast.error('Error', msg);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/users']);
  }
}