import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UpdateUser, UserResponse } from '../../../../core/models/User';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
<div class="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10 border border-gray-100">
  <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Edit User</h2>

  <form *ngIf="userForm" [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <div class="grid grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">First Name</label>
        <input 
          formControlName="firstName" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="First name" 
        />
        <div *ngIf="userForm.get('firstName')?.invalid && userForm.get('firstName')?.touched" class="text-red-500 text-xs mt-1">
          First name is required
        </div>
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Last Name</label>
        <input 
          formControlName="lastName" 
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="Last name" 
        />
        <div *ngIf="userForm.get('lastName')?.invalid && userForm.get('lastName')?.touched" class="text-red-500 text-xs mt-1">
          Last name is required
        </div>
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input 
        formControlName="email" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        placeholder="Email address" 
      />
      <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" class="text-red-500 text-xs mt-1">
        Valid email is required
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Phone Number</label>
      <input 
        formControlName="phoneNumber" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        placeholder="Phone number" 
      />
      <div *ngIf="userForm.get('phoneNumber')?.invalid && userForm.get('phoneNumber')?.touched" class="text-red-500 text-xs mt-1">
        Valid phone number is required
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Role</label>
      <select 
        formControlName="role" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
      >
        <option value="ADMIN">Admin</option>
        <option value="GUIDE">Guide</option>
        <option value="TOURIST">Tourist</option>
      </select>
      <div *ngIf="userForm.get('role')?.invalid && userForm.get('role')?.touched" class="text-red-500 text-xs mt-1">
        Role is required
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <label class="block text-sm font-medium text-gray-700">Status</label>
      <select 
        formControlName="isActive" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
      >
        <option [ngValue]="true">Active</option>
        <option [ngValue]="false">Inactive</option>
      </select>
    </div>

    <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-4">
      <button 
        type="button" 
        (click)="cancel()" 
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button 
        type="submit" 
        [disabled]="userForm.invalid" 
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Update
      </button>
    </div>
  </form>
</div>
  `,
  styles: ``
})
export class UserEditComponent implements OnInit {
  userId!: string;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toast: ToastService 
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe({
      next: (user: UserResponse) => {
        this.userForm = this.fb.group({
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          password: ['', [
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
          ]],
          phoneNumber: [user.phoneNumber, [
            Validators.required,
            Validators.pattern(/^\+?[0-9]{10,15}$/)
          ]],
          role: [user.role, Validators.required],
          isActive: [user.active, Validators.required]
        });
      },
      error: () => {
        this.toast.error('Error', 'Failed to load user');
        this.router.navigate(['/admin/users']);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
  
      const updateData: UpdateUser = { ...formValue };
      
  
      this.userService.updateUser(this.userId, updateData).subscribe({
        next: () => {
          this.toast.success('Success', 'User updated successfully');
          this.router.navigate(['/admin/users']);
        },
        error: () => {
          this.toast.error('Error', 'Update failed');
        }
      });
    }
  }
  

  cancel() {
    this.router.navigate(['/admin/users']);
  }
}
