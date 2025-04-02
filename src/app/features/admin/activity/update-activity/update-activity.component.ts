import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../../core/services/activity.service';
import { CategoryService } from '../../../../core/services/category.service';
import { PlaceService } from '../../../../core/services/place.service';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-update-activity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-xl font-bold text-center text-yellow-500 mb-6">
        Update Activity
      </h2>

      <div *ngIf="isLoading" class="flex justify-center my-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <form *ngIf="!isLoading && activityForm" [formGroup]="activityForm" (ngSubmit)="onSubmit()" class="space-y-6">
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

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Status Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Status
              <span class="text-red-500 ml-1">*</span>
            </label>
            <select
              formControlName="status"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [ngClass]="{'border-red-500': isFieldInvalid('status')}"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <div *ngIf="isFieldInvalid('status')" class="text-red-500 text-sm mt-1">
              Status is required
            </div>
          </div>
          
          <!-- Availability Input -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Availability
              <span class="text-red-500 ml-1">*</span>
            </label>
            <select
              formControlName="availability"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              [ngClass]="{'border-red-500': isFieldInvalid('availability')}"
            >
              <option [ngValue]="true">Available</option>
              <option [ngValue]="false">Not Available</option>
            </select>
            <div *ngIf="isFieldInvalid('availability')" class="text-red-500 text-sm mt-1">
              Availability is required
            </div>
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
          
          <!-- Current Images (if any) -->
          <div *ngIf="existingImages.length > 0" class="mb-4">
            <div class="text-sm font-medium text-gray-700 mb-2">Current Images:</div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div *ngFor="let image of existingImages; let i = index" class="relative">
                <img [src]="image" alt="Activity image" class="w-full h-24 object-cover rounded">
                <button 
                  type="button" 
                  (click)="removeExistingImage(i)" 
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          
          <!-- Upload new images -->
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
          
          <!-- Newly selected files -->
          <div *ngIf="selectedFiles.length > 0" class="mt-3">
            <div class="text-sm font-medium text-gray-700 mb-2">Newly selected files:</div>
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

        <!-- Submit and Cancel Buttons -->
        <div class="grid grid-cols-2 gap-4 pt-4">
          <button
            type="button"
            (click)="goBack()"
            class="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 
                   transition duration-300 ease-in-out focus:outline-none focus:ring-2 
                   focus:ring-gray-400 focus:ring-opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 
                   transition duration-300 ease-in-out transform hover:scale-101
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="isSubmitting"
          >
            <span *ngIf="isSubmitting" class="inline-block mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSubmitting ? 'Updating...' : 'Update Activity' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class UpdateActivityComponent implements OnInit {
  activityId!: string;
  activityForm!: FormGroup;
  categories: any[] = [];
  places: any[] = [];
  guides: any[] = [];
  selectedPhoto: string | null = null;
  selectedFiles: File[] = [];
  existingImages: string[] = [];
  isLoading = true;
  isSubmitting = false;
  formSubmitted = false;
  activityData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private placeService: PlaceService,
    private userService: UserService,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    this.activityId = this.route.snapshot.paramMap.get('id') || '';
    
    if (!this.activityId) {
      this.toastr.error('Error', 'No activity ID provided');
      this.router.navigate(['/admin/activities']);
      return;
    }
    
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.activityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      registrationDeadline: ['', [Validators.required]],
      placeId: ['', [Validators.required]],
      guideId: [''],
      status: ['ACTIVE', [Validators.required]],
      availability: [true, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    }, { validators: this.deadlineBeforeActivityDateValidator });
  }

  loadData() {
    // Load categories, places, and guides
    Promise.all([
      this.loadCategories(),
      this.loadPlaces(),
      this.loadGuides(),
      this.loadActivity()
    ]).then(() => {
      this.isLoading = false;
    }).catch(error => {
      this.toastr.error('Error', 'Failed to load necessary data');
      this.isLoading = false;
    });
  }

  loadCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoryService.getAll().subscribe({
        next: (res) => {
          this.categories = res.content || res;
          resolve();
        },
        error: (err) => {
          console.error('Failed to fetch categories', err);
          reject(err);
        }
      });
    });
  }

  loadPlaces(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.placeService.getAllPlaces().subscribe({
        next: (res) => {
          this.places = res.content || res;
          resolve();
        },
        error: (err) => {
          console.error('Failed to fetch places', err);
          reject(err);
        }
      });
    });
  }

  loadGuides(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getAllGuides().subscribe({
        next: (res: any[]) => {
          this.guides = res;
          resolve();
        },
        error: (err) => {
          console.error('Failed to fetch guides', err);
          reject(err);
        }
      });
    });
  }

  loadActivity(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.activityService.getActivityById(this.activityId).subscribe({
        next: (activity) => {
          this.activityData = activity;
          this.populateForm(activity);
          resolve();
        },
        error: (err) => {
          this.toastr.error('Error', 'Failed to load activity details');
          console.error('Failed to fetch activity', err);
          reject(err);
        }
      });
    });
  }

  populateForm(activity: any) {
    // Format date strings to datetime-local input format
    const formattedDate = this.formatDateForInput(activity.date);
    const formattedDeadline = this.formatDateForInput(activity.registrationDeadline);
    
    // Set existing images
    if (activity.images && activity.images.length) {
      this.existingImages = activity.images.map((img: any) => img.imageUrl);
    }
    
    // Update form values
    this.activityForm.patchValue({
      name: activity.name,
      capacity: activity.capacity,
      price: activity.price,
      categoryId: activity.category?.id,
      date: formattedDate,
      registrationDeadline: formattedDeadline,
      placeId: activity.place?.id,
      guideId: activity.guide?.id || '',
      description: activity.description,
      status: activity.status,
      availability: activity.availability
    });
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    // Format: YYYY-MM-DDThh:mm
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
    } else if (this.existingImages.length > 0) {
      this.selectedPhoto = this.existingImages[0];
    } else {
      this.selectedPhoto = null;
    }
  }

  removeExistingImage(index: number) {
    this.existingImages.splice(index, 1);
    if (this.existingImages.length === 0 && this.selectedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhoto = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFiles[0]);
    } else if (this.existingImages.length > 0) {
      this.selectedPhoto = this.existingImages[0];
    } else {
      this.selectedPhoto = null;
    }
  }

  async prepareImageUrls(): Promise<string[]> {
    // This is a placeholder - in a real app, you would upload these files to a server
    // and receive URLs in return.
    const imageUrls: string[] = [...this.existingImages];
    
    for (const file of this.selectedFiles) {
      // In a real implementation, you would:
      // 1. Upload the file to your server/cloud storage
      // 2. Get the URL back and add it to imageUrls
      // For this example, we'll just create dummy URLs
      imageUrls.push(`/uploads/${Date.now()}_${file.name}`);
    }
    
    return imageUrls;
  }

  async onSubmit() {
    this.formSubmitted = true;
    
    if (this.activityForm.invalid) {
      // Highlight all invalid fields
      Object.keys(this.activityForm.controls).forEach(key => {
        const control = this.activityForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    try {
      this.isSubmitting = true;
      
      const imageUrls = await this.prepareImageUrls();
      
      const activityRequest = {
        ...this.activityForm.value,
        imageUrls: imageUrls
      };
      
      if (activityRequest.guideId === '') {
        activityRequest.guideId = null;
      }
      
      this.activityService.updateActivity(this.activityId, activityRequest).subscribe({
        next: (response) => {
          this.toastr.success('Success', 'Activity updated successfully!');
          this.router.navigate(['/admin/activities']);
        },
        error: (error) => {
          if (error.error?.message?.includes('guide is busy')) {
            this.toastr.error('Error', 'The selected guide is busy at this time. Please choose another guide or remove the guide from the activity.');
          } else {
            this.toastr.error('Error', 'Failed to update activity. Please try again later.');
          }
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } catch (error) {
      this.toastr.error('Error', 'An error occurred while processing your request. Please try again later.');
      this.isSubmitting = false;
    }
  }

  goBack() {
    this.router.navigate(['/admin/activities']);
  }
}
