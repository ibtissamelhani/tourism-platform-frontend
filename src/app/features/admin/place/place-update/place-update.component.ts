import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaceRequest, PlaceType } from '../../../../core/models/Place';
import { PlaceService } from '../../../../core/services/place.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-place-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div class="max-w-md w-full bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Update Place</h2>
        
        <div *ngIf="loading" class="text-center text-gray-600">
          Loading place data...
        </div>
        
        <div *ngIf="error" class="p-4 text-red-700 bg-red-100 rounded-md">
          {{ error }}
        </div>
        
        <form *ngIf="!loading && !error" [formGroup]="placeForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label 
              for="name" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input 
              id="name" 
              formControlName="name" 
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition duration-200 ease-in-out
                     {{ placeForm.get('name')?.invalid && placeForm.get('name')?.touched 
                        ? 'border-red-500 text-red-900' 
                        : '' }}"
            >
            <div 
              *ngIf="placeForm.get('name')?.invalid && placeForm.get('name')?.touched"
              class="text-red-500 text-sm mt-1"
            >
              Name is required
            </div>
          </div>

          <div>
            <label 
              for="address" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input 
              id="address" 
              formControlName="address" 
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition duration-200 ease-in-out
                     {{ placeForm.get('address')?.invalid && placeForm.get('address')?.touched 
                        ? 'border-red-500 text-red-900' 
                        : '' }}"
            >
            <div 
              *ngIf="placeForm.get('address')?.invalid && placeForm.get('address')?.touched"
              class="text-red-500 text-sm mt-1"
            >
              Address is required
            </div>
          </div>

          <div>
            <label 
              for="city" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input 
              id="city" 
              formControlName="city" 
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition duration-200 ease-in-out
                     {{ placeForm.get('city')?.invalid && placeForm.get('city')?.touched 
                        ? 'border-red-500 text-red-900' 
                        : '' }}"
            >
            <div 
              *ngIf="placeForm.get('city')?.invalid && placeForm.get('city')?.touched"
              class="text-red-500 text-sm mt-1"
            >
              City is required
            </div>
          </div>

          <div>
            <label 
              for="typeId" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Place Type
            </label>
            <select 
              id="typeId" 
              formControlName="typeId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition duration-200 ease-in-out
                     {{ placeForm.get('typeId')?.invalid && placeForm.get('typeId')?.touched 
                        ? 'border-red-500 text-red-900' 
                        : '' }}"
            >
              <option value="" disabled>Select a Place Type</option>
              <option 
                *ngFor="let type of placeTypes" 
                [value]="type.id"
              >
                {{ type.name }}
              </option>
            </select>
            <div 
              *ngIf="placeForm.get('typeId')?.invalid && placeForm.get('typeId')?.touched"
              class="text-red-500 text-sm mt-1"
            >
              Place Type is required
            </div>
          </div>

          <div class="flex gap-4">
            <button 
              type="button" 
              (click)="onCancel()"
              class="w-1/2 flex justify-center py-2 px-4 border border-gray-300 
                     rounded-md shadow-sm text-sm font-medium text-gray-700 
                     bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500 
                     transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              [disabled]="placeForm.invalid || submitting"
              class="w-1/2 flex justify-center py-2 px-4 border border-transparent 
                     rounded-md shadow-sm text-sm font-medium text-white 
                     bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500 
                     transition duration-200 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Updating...' : 'Update Place' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class PlaceUpdateComponent implements OnInit {
  placeForm: FormGroup;
  placeTypes: PlaceType[] = [];
  placeId: string | null = null;
  loading = true;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
    this.placeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      typeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.placeId = this.route.snapshot.paramMap.get('id');
    if (!this.placeId) {
      this.toastService.error('Error', 'No place ID provided');
      this.error = 'No place ID provided';
      this.loading = false;
      return;
    }
    
    this.placeService.getAllTypes().subscribe({
      next: (types) => {
        this.placeTypes = types;
        this.loadPlaceDetails();
      },
      error: (error) => {
        console.error('Error fetching place types', error);
        this.toastService.error('Error', error.error.message || 'An unexpected error occurred during fetching place types');
        this.error = 'Failed to load place types';
        this.loading = false;
      }
    });
  }

  loadPlaceDetails() {
    if (!this.placeId) return;
    
    this.placeService.getPlaceById(this.placeId).subscribe({
      next: (place) => {
        const matchedType = this.placeTypes.find(t => t.name === String(place.type));

        this.placeForm.patchValue({
          name: place.name,
          address: place.address,
          city: place.city,
          typeId: matchedType?.id || ''
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching place details', error);
        this.toastService.error('Error', error.error.message || 'An unexpected error occurred during fetching place details');
         this.router.navigate(['/admin/places']);
        this.error = 'Failed to load place details';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.placeForm.valid && this.placeId) {
      this.submitting = true;
      const placeRequest: PlaceRequest = this.placeForm.value;
      
      this.placeService.updatePlace(this.placeId, placeRequest).subscribe({
        next: (response) => {
          console.log('Place updated successfully', response);
          this.toastService.success('Success', 'Place updated successfully');
          this.router.navigate(['/admin/places']); // Navigate back to places list
        },
        error: (error) => {
          console.error('Error updating place', error);
          this.toastService.error('Error', error.error.message || 'An unexpected error occurred during updating place');
          this.error = 'Failed to update place';
          this.submitting = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/admin/places']); 
  }
}
