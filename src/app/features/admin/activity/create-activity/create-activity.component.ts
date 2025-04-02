import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivityRequest,
  ActivityStatus,
} from '../../../../core/models/Activity';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivityService } from '../../../../core/services/activity.service';
import { CategoryService } from '../../../../core/services/category.service';
import { UserService } from '../../../../core/services/user.service';
import { PlaceService } from '../../../../core/services/place.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
    <h2 class="text-xl font-bold text-center text-yellow-500 mb-6">
      Create New Activity
    </h2>

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
          [ngClass]="{'border-red-500': isFieldInvalid('name')}"
        />
        <div *ngIf="isFieldInvalid('name')" class="text-red-500 text-sm mt-1">
          <div *ngIf="activityForm.get('name')?.errors?.['required']">Activity name is required</div>
          <div *ngIf="activityForm.get('name')?.errors?.['minlength']">Activity name must be at least 3 characters</div>
        </div>
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
            [ngClass]="{'border-red-500': isFieldInvalid('capacity')}"
          />
          <div *ngIf="isFieldInvalid('capacity')" class="text-red-500 text-sm mt-1">
            <div *ngIf="activityForm.get('capacity')?.errors?.['required']">Capacity is required</div>
            <div *ngIf="activityForm.get('capacity')?.errors?.['min']">Capacity must be at least 1</div>
          </div>
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
            [ngClass]="{'border-red-500': isFieldInvalid('price')}"
          />
          <div *ngIf="isFieldInvalid('price')" class="text-red-500 text-sm mt-1">
            <div *ngIf="activityForm.get('price')?.errors?.['required']">Price is required</div>
            <div *ngIf="activityForm.get('price')?.errors?.['min']">Price must be at least 0</div>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2"
            >Category <span class="text-red-500 ml-1">*</span></label
          >
          <select
            formControlName="categoryId"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            [ngClass]="{'border-red-500': isFieldInvalid('categoryId')}"
          >
            <option value="" disabled>Select category</option>
            <option *ngFor="let category of categories" [value]="category.id">
              {{ category.name }}
            </option>
          </select>
          <div *ngIf="isFieldInvalid('categoryId')" class="text-red-500 text-sm mt-1">
            Category is required
          </div>
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
            [ngClass]="{'border-red-500': isFieldInvalid('date')}"
          />
          <div *ngIf="isFieldInvalid('date')" class="text-red-500 text-sm mt-1">
            <div *ngIf="activityForm.get('date')?.errors?.['required']">Date is required</div>
            <div *ngIf="activityForm.get('date')?.errors?.['futureDate']">Date must be in the future</div>
          </div>
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
            [ngClass]="{'border-red-500': isFieldInvalid('registrationDeadline')}"
          />
          <div *ngIf="isFieldInvalid('registrationDeadline')" class="text-red-500 text-sm mt-1">
            <div *ngIf="activityForm.get('registrationDeadline')?.errors?.['required']">Registration deadline is required</div>
            <div *ngIf="activityForm.get('registrationDeadline')?.errors?.['futureDate']">Date must be in the future</div>
            <div *ngIf="activityForm.get('registrationDeadline')?.errors?.['beforeActivityDate']">Deadline must be before activity date</div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Place ID Input -->
        <div>
          <label class="block text-gray-700 font-medium mb-2"
            >Place <span class="text-red-500 ml-1">*</span></label
          >
          <select
            formControlName="placeId"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            [ngClass]="{'border-red-500': isFieldInvalid('placeId')}"
          >
            <option value="" disabled>Select place</option>
            <option *ngFor="let place of places" [value]="place.id">
              {{ place.name }} ({{ place.city }})
            </option>
          </select>
          <div *ngIf="isFieldInvalid('placeId')" class="text-red-500 text-sm mt-1">
            Place is required
          </div>
        </div>
        <div>
          <label class="block text-gray-700 font-medium mb-2">Guide</label>
          <select
            formControlName="guideId"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            <option *ngFor="let guide of guides" [value]="guide.id">
              {{ guide.firstName }} {{ guide.lastName }}
            </option>
          </select>
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
          [ngClass]="{'border-red-500': isFieldInvalid('description')}"
        ></textarea>
        <div *ngIf="isFieldInvalid('description')" class="text-red-500 text-sm mt-1">
          <div *ngIf="activityForm.get('description')?.errors?.['required']">Description is required</div>
          <div *ngIf="activityForm.get('description')?.errors?.['minlength']">Description must be at least 10 characters</div>
        </div>
      </div>

      <!-- Image URLs Input -->
      <div>
        <label class="block text-gray-700 font-medium mb-2"> Images </label>
        <div
          [ngStyle]="{
            'background-image': selectedPhoto
              ? 'url(' + selectedPhoto + ')'
              : 'none',
            'background-size': 'cover',
            'background-position': 'center'
          }"
          class="mt-1 flex justify-center px-6 py-8 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
        >
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
            <div
              class="flex flex-col items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <label
                class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload files</span>
                <input
                  type="file"
                  class="sr-only"
                  multiple
                  accept="image/*"
                  (change)="onFileSelected($event)"
                />
              </label>
              <p class="mt-1">or drag and drop</p>
            </div>
            <p class="text-xs text-red-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        <div *ngIf="selectedFiles.length > 0" class="mt-3">
          <div class="text-sm font-medium text-gray-700 mb-2">Selected files:</div>
          <div class="flex flex-wrap gap-2">
            <div *ngFor="let file of selectedFiles; let i = index" class="relative">
              <div class="bg-gray-100 p-2 rounded">
                {{ file.name }}
                <button type="button" (click)="removeFile(i)" class="ml-2 text-red-500">×</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- General form error message -->
      <div *ngIf="formSubmitted && activityForm.invalid" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Please correct the errors before submitting the form.
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 
                 transition duration-300 ease-in-out transform hover:scale-101
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                 disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="isLoading"
        >
          <span *ngIf="isLoading" class="inline-block mr-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isLoading ? 'Creating...' : 'Create Activity' }}
        </button>
      </div>
    </form>
  </div>
`,
styles: ``,
})
export class CreateActivityComponent implements OnInit {
activityForm!: FormGroup;
categories: any[] = [];
places: any[] = [];
guides: any[] = [];
selectedPhoto: string | null = null;
selectedFiles: File[] = [];
isLoading = false;
formSubmitted = false;

constructor(
  private formBuilder: FormBuilder,
  private activityService: ActivityService,
  private categoryService: CategoryService,
  private placeService: PlaceService,
  private userService: UserService,
  private router: Router,
  private toastr: ToastService
) {}

ngOnInit() {
  this.initForm();
  this.loadData();
}

initForm() {
  this.activityForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    capacity: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.min(0)]],
    categoryId: ['', [Validators.required]],
    date: ['', [Validators.required, this.futureDateValidator]],
    registrationDeadline: ['', [Validators.required,this.futureDateValidator]],
    placeId: ['', [Validators.required]],
    guideId: [''],
    description: ['', [Validators.required, Validators.minLength(10)]],
    imageUrls: [[]]
  }, { validators: this.deadlineBeforeActivityDateValidator });
}

loadData() {
  this.categoryService.getAll().subscribe({
    next: (res) => {
      this.categories = res.content || res;
    },
    error: () => {
      this.toastr.error('error','Failed to fetch categories');
    },
  });

  this.placeService.getAllPlaces().subscribe({
    next: (res) => {
      this.places = res.content || res;
    },
    error: () => {
      this.toastr.error('error','Failed to fetch places');
    },
  });

  this.userService.getAllGuides().subscribe({
    next: (res: any[]) => {
      this.guides = res;
    },
    error: () => {
      this.toastr.error('error','Failed to fetch guides');
    },
  });
}

futureDateValidator(control: any) {
  if (!control.value) return null;
  
  const inputDate = new Date(control.value);
  const currentDate = new Date();
  
  return inputDate > currentDate ? null : { 'futureDate': true };
}

deadlineBeforeActivityDateValidator(formGroup: FormGroup) {
  const activityDate = formGroup.get('date')?.value;
  const registrationDeadline = formGroup.get('registrationDeadline')?.value;
  
  if (!activityDate || !registrationDeadline) return null;
  
  const activityDateObj = new Date(activityDate);
  const deadlineDateObj = new Date(registrationDeadline);
  
  if (deadlineDateObj >= activityDateObj) {
    formGroup.get('registrationDeadline')?.setErrors({ 'beforeActivityDate': true });
    return { 'beforeActivityDate': true };
  }
  
  return null;
}

isFieldInvalid(fieldName: string): boolean {
  const field = this.activityForm.get(fieldName);
  return !!(field && field.invalid && (field.dirty || field.touched || this.formSubmitted));
}

onFileSelected(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  
  if (files && files.length > 0) {
    // Display preview of the first image
    const firstFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPhoto = reader.result as string;
    };
    reader.readAsDataURL(firstFile);
    
    // Store all selected files
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }
}

removeFile(index: number) {
  this.selectedFiles.splice(index, 1);
  if (this.selectedFiles.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPhoto = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFiles[0]);
  } else {
    this.selectedPhoto = null;
  }
}

async prepareImageUrls(): Promise<string[]> {

  const imageUrls: string[] = [];
  
  for (const file of this.selectedFiles) {
    imageUrls.push(`/uploads/${Date.now()}_${file.name}`);
  }
  
  return imageUrls;
}

async onSubmit() {
  this.formSubmitted = true;
  
  if (this.activityForm.invalid) {
    Object.keys(this.activityForm.controls).forEach(key => {
      const control = this.activityForm.get(key);
      control?.markAsTouched();
    });
    return;
  }
  
  try {
    this.isLoading = true;
    
    // Prepare image URLs (in a real app, this would upload files to server)
    const imageUrls = await this.prepareImageUrls();
    
    // Prepare request payload
    const activityRequest = {
      ...this.activityForm.value,
      imageUrls: imageUrls
    };
    
    // If guideId is empty string, set it to null
    if (activityRequest.guideId === '') {
      activityRequest.guideId = null;
    }
    
    // Send request to backend
    this.activityService.createActivity(activityRequest).subscribe({
      next: (response) => {
        this.toastr.success('success', 'Activity created successfully!');
        this.router.navigate(['/admin/activities']);
      },
      error: (error) => {
        if (error.error?.message?.includes('guide is busy')) {
          this.toastr.error('Error','The selected guide is already busy at this time');
        } else {
          this.toastr.error('Error', 'Failed to create activity. Please try again.');
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  } catch (error) {
    this.toastr.error('Error', 'An error occurred while processing your request');
    this.isLoading = false;
  }
}
}
