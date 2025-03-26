import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivityRequest, ActivityStatus } from '../../../../core/models/Activity';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService } from '../../../../core/services/activity.service';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
 <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-xl font-bold text-center text-yellow-500 mb-6">Create New Activity</h2>
      
      <form [formGroup]="activityForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Activity Name
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="text" 
              formControlName="name"
              placeholder="Enter activity name"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('name')"
            >
            <p *ngIf="isFieldInvalid('name')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('name') }}
            </p>
          </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Capacity Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Max Participants
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="number" 
              formControlName="capacity"
              placeholder="Number of participants"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('capacity')"
            >
            <p *ngIf="isFieldInvalid('capacity')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('capacity') }}
            </p>
          </div>

          <!-- Price Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Price
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="number" 
              step="0.01"
              formControlName="price"
              placeholder="0.00"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('price')"
            >
            <p *ngIf="isFieldInvalid('price')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('price') }}
            </p>
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Category
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="text" 
              formControlName="categoryId"
              placeholder="Enter Category UUID"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('categoryId')"
            >
            <p *ngIf="isFieldInvalid('categoryId')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('categoryId') }}
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Activity Date Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Activity Date
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="datetime-local" 
              formControlName="date"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('date')"
            >
            <p *ngIf="isFieldInvalid('date')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('date') }}
            </p>
          </div>

          <!-- Registration Deadline Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Registration Deadline
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="datetime-local" 
              formControlName="registrationDeadline"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('registrationDeadline')"
            >
            <p *ngIf="isFieldInvalid('registrationDeadline')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('registrationDeadline') }}
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Place ID Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Place ID
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="text" 
              formControlName="placeId"
              placeholder="Enter Place UUID"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('placeId')"
            >
            <p *ngIf="isFieldInvalid('placeId')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('placeId') }}
            </p>
          </div>
          <div>
          <label class="block text-gray-700 font-medium mb-2">
            Guide
          </label>
          <input 
            type="text" 
            formControlName="guideId"
            placeholder="Enter Guide UUID (Optional)"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        </div>

        <div>
            <label class="block text-gray-700 font-medium mb-2">
              Description
              <span class="text-red-500 ml-1">*</span>
            </label>
            <textarea 
              formControlName="description"
              placeholder="Describe the activity"
              rows="4"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="isFieldInvalid('description')"
            ></textarea>
            <p *ngIf="isFieldInvalid('description')" class="text-red-500 text-sm mt-1">
              {{ getErrorMessage('description') }}
            </p>
        </div>

        <!-- Image URLs Input -->
        <div>
          <label class="block text-gray-700 font-medium mb-2">
            Images
          </label>
          <div
          [ngStyle]="{ 'background-image': selectedPhoto ? 'url(' + selectedPhoto + ')' : 'none', 'background-size': 'cover', 'background-position': 'center' }"
          class="mt-1 flex justify-center px-6 py-8 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
          <div class="space-y-3 text-center">
            <svg
              class="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex flex-col items-center text-sm text-gray-600 dark:text-gray-400">
              <label class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload files</span>
                <input
                  type="file"
                  formControlName="imageUrls"
                  class="sr-only"
                  multiple
                  accept="image/*"
                  (change)="onFileSelected($event)"
                />
              </label>
              <p class="mt-1">or drag and drop</p>
            </div>
            <p class="text-xs text-red-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button 
            type="submit" 
            [disabled]="activityForm.invalid"
            class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 
                   transition duration-300 ease-in-out transform hover:scale-101
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Activity
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class CreateActivityComponent {
  activityForm: FormGroup;
  activityStatuses = Object.values(ActivityStatus);

  constructor(private fb: FormBuilder, private activityService: ActivityService) {
    this.activityForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(255)
      ]],
      description: ['', Validators.required],
      capacity: [null, [
        Validators.required, 
        Validators.min(1)
      ]],
      price: [null, [
        Validators.required, 
        Validators.min(0)
      ]],
      date: ['', [
        Validators.required,
        this.futureDateValidator
      ]],
      registrationDeadline: ['', [
        Validators.required,
        this.futureDateValidator
      ]],
      categoryId: ['', Validators.required],
      placeId: ['', Validators.required],
      status: ['', Validators.required],
      guideId: [''],
      availability: [true],
      imageUrls: ['']
    }, { validators: this.deadlineBeforeDateValidator });
  }

  // Custom validator for future dates
  futureDateValidator(control: any) {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate > today ? null : { pastDate: true };
  }

  // Custom validator to ensure registration deadline is before activity date
  deadlineBeforeDateValidator(form: FormGroup) {
    const deadline = form.get('registrationDeadline')?.value;
    const activityDate = form.get('date')?.value;
    
    if (deadline && activityDate) {
      const deadlineDate = new Date(deadline);
      const activityDateTime = new Date(activityDate);
      
      return deadlineDate < activityDateTime 
        ? null 
        : { deadlineAfterDate: true };
    }
    return null;
  }

  // Check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.activityForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Get error messages for specific fields
  getErrorMessage(fieldName: string): string {
    const field = this.activityForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) return `${this.toTitleCase(fieldName)} is required`;
    if (field.hasError('maxlength')) return `${this.toTitleCase(fieldName)} cannot exceed 255 characters`;
    if (field.hasError('min')) return `${this.toTitleCase(fieldName)} must be at least ${field.errors?.['min'].min}`;
    if (field.hasError('pastDate')) return `${this.toTitleCase(fieldName)} must be in the future`;
    
    // Special case for deadline validation
    if (this.activityForm.hasError('deadlineAfterDate')) {
      return 'Registration deadline must be before the activity date';
    }

    return 'Invalid input';
  }

  selectedPhoto: string | null = null;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Utility to convert field names to title case
  toTitleCase(str: string): string {
    return str.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  onSubmit() {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }
  
    // Extract form values
    const formValue = this.activityForm.value;
  
    // Format dates as ISO strings if needed
    const request: ActivityRequest = {
      ...formValue,
      date: new Date(formValue.date).toISOString(),
      registrationDeadline: new Date(formValue.registrationDeadline).toISOString(),
      imageUrls: this.selectedPhoto ? [this.selectedPhoto] : [] // assuming base64 single image
    };
  
    this.activityService.createActivity(request).subscribe({
      next: (response) => {
        console.log('Activity created:', response);
        alert('Activity successfully created!');
        this.activityForm.reset(); // optional: reset the form
        this.selectedPhoto = null;
      },
      error: (err) => {
        console.error('Create activity failed:', err);
        alert('Something went wrong while creating the activity.');
      }
    });
  }
  
}
