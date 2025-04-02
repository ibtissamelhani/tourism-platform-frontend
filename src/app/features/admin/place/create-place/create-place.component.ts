import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaceRequest, PlaceType } from '../../../../core/models/Place';
import { PlaceService } from '../../../../core/services/place.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-place',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  template: `
      <div class="max-w-md w-full mx-auto bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 class="text-center text-xl font-extrabold text-yellow-500">Create New Place</h2>
        
        <form [formGroup]="placeForm" (ngSubmit)="onSubmit()" class="space-y-6">
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

          <div>
            <button 
              type="submit" 
              [disabled]="placeForm.invalid"
              class="w-full flex justify-center py-2 px-4 border border-transparent 
                     rounded-md shadow-sm text-sm font-medium text-white 
                     bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500 
                     transition duration-200 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Place
            </button>
          </div>
        </form>
      </div>
  `,
  styles: ``
})
export class CreatePlaceComponent implements OnInit {
  placeForm: FormGroup;
  placeTypes: PlaceType[] = [];

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.placeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      typeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadPlaceTypes();
  }

  loadPlaceTypes() {
    this.placeService.getAllTypes().subscribe({
      next: (types) => {
        this.placeTypes = types;
      },
      error: (error) => {
        this.toastService.error('error', error.error.message || 'An unexpected error occurred during fetching place types');
      }
    });
  }

  onSubmit() {
    if (this.placeForm.valid) {
      const placeRequest: PlaceRequest = this.placeForm.value;
      
      this.placeService.createPlace(placeRequest).subscribe({
        next: (response) => {
          this.toastService.success('success', 'Place added successfully');
          this.router.navigate(['/admin/places']);
        },
        error: (error) => {
          this.toastService.error('error', error.error.message || 'An unexpected error occurred');}
      });
    }
  }
}
