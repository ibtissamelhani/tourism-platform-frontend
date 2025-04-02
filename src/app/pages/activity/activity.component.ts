import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ActivityResponse } from '../../core/models/Activity';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../core/services/activity.service';
import { ToastService } from '../../core/services/toast.service';
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe, NavbarComponent, FooterComponent, ReactiveFormsModule],
  template: `
  <app-navbar/>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto my-16" *ngIf="activity">
      <!-- Image Carousel -->
      <div class="relative h-64 bg-gray-200">
        <div *ngIf="activity.imageUrls && activity.imageUrls.length > 0" class="h-full">
          <img 
            [src]="activity.imageUrls[currentImageIndex]" 
            class="w-full h-full object-cover"
            alt="{{ activity.name }}"
          />
          
          <!-- Image Navigation -->
          <div *ngIf="activity.imageUrls.length > 1" class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <button 
              *ngFor="let image of activity.imageUrls; let i = index"
              (click)="setCurrentImage(i)"
              class="w-3 h-3 rounded-full"
              [ngClass]="{'bg-white': i === currentImageIndex, 'bg-gray-400': i !== currentImageIndex}"
            ></button>
          </div>
        </div>
        
        <div *ngIf="!activity.imageUrls || activity.imageUrls.length === 0" class="flex items-center justify-center h-full">
          <p class="text-gray-500">No images available</p>
        </div>
      </div>
      
      <!-- Activity Status Badge -->
      <div class="px-6 pt-4">
        <span 
          class="inline-block px-3 py-1 text-sm font-semibold rounded-full"
          [ngClass]="{
            'bg-red-100 text-red-800': activity.status === 'CANCELED',
            'bg-blue-100 text-blue-800': activity.status === 'ACTIVE',
          }"
        >
          {{ activity.status }}
        </span>
        
        <span 
          *ngIf="activity.availability" 
          class="inline-block ml-2 px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full"
        >
          Available
        </span>
        
        <span 
          *ngIf="!activity.availability" 
          class="inline-block ml-2 px-3 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded-full"
        >
          Fully Booked
        </span>
      </div>
      
      <!-- Activity Title & Price -->
      <div class="px-6 pt-2 pb-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">{{ activity.name }}</h1>
          <div class="text-xl font-bold text-blue-600">{{ activity.price.toFixed(2) }} MAD</div>
        </div>
        
        <!-- Category & Location -->
        <div class="flex items-center mt-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          <span>{{ activity.category }}</span>
          
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ activity.place }}</span>
        </div>
      </div>
      
      <!-- Activity Description -->
      <div class="px-6 py-4 border-t border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Description</h2>
        <p class="text-gray-600">{{ activity.description }}</p>
      </div>
      
      <!-- Activity Details -->
      <div class="px-6 py-4 border-t border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Details</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Date & Time -->
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="font-medium text-gray-700">Date & Time</p>
              <p class="text-gray-600">{{ activity.date | date:'EEEE, MMM d, y, h:mm a' }}</p>
            </div>
          </div>
          
          <!-- Registration Deadline -->
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="font-medium text-gray-700">Registration Deadline</p>
              <p class="text-gray-600">{{ activity.registrationDeadline | date:'EEEE, MMM d, y, h:mm a' }}</p>
              <p *ngIf="isDeadlineNear()" class="text-sm text-red-600 font-medium">Registration closing soon!</p>
            </div>
          </div>
          
          <!-- Capacity -->
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <p class="font-medium text-gray-700">Capacity</p>
              <p class="text-gray-600">{{ activity.capacity }} participants</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Guide Information -->
      <div class="px-6 py-4 border-t border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Your Guide</h2>
        
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-800 font-medium text-lg">{{ activity.guideFirstName.charAt(0) }}{{ activity.guideLastName.charAt(0) }}</span>
          </div>
          
          <div class="ml-4">
            <p class="font-medium text-gray-800">{{ activity.guideFirstName }} {{ activity.guideLastName }}</p>
            <a href="mailto:{{ activity.guideEmail }}" class="text-blue-600 hover:text-blue-800 transition-colors">
              {{ activity.guideEmail }}
            </a>
          </div>
        </div>
      </div>
      
      <!-- Reservation Form -->
      <div class="px-6 py-4 border-t border-gray-200" *ngIf="activity.availability && activity.status === 'ACTIVE'">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Make a Reservation</h2>
        
        <form [formGroup]="reservationForm" (ngSubmit)="submitReservation()">
          <div class="flex flex-col">
            <!-- Number of Participants -->
            <div>
              <label for="participants" class="block text-sm font-medium text-gray-700 mb-1">
                Number of Participants
              </label>
              <div class="flex items-center">
                <button 
                  type="button"
                  class="p-2 border border-gray-300 rounded-l-md bg-yellow-500 text-gray-600 hover:bg-gray-100"
                  (click)="decrementParticipants()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  id="participants"
                  formControlName="numberOfParticipants"
                  class="w-16 p-2 text-center border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  [max]="activity.capacity"
                />
                <button 
                  type="button"
                  class="p-2 border border-gray-300 rounded-r-md bg-yellow-500 text-gray-600 hover:bg-gray-100"
                  (click)="incrementParticipants()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-red-600 mt-1" *ngIf="reservationForm.get('numberOfParticipants')?.invalid && reservationForm.get('numberOfParticipants')?.touched">
                Please enter a valid number of participants (1-{{ activity.capacity }})
              </p>
            </div>
            
            <!-- Price Calculation -->
            <div class="mt-4 p-4 bg-gray-50 rounded-md">
              <div class="flex justify-between">
                <span class="text-gray-700">Price per person:</span>
                <span class="font-medium">{{ activity.price.toFixed(2) }} MAD</span>
              </div>
              <div class="flex justify-between mt-2">
                <span class="text-gray-700">Number of participants:</span>
                <span class="font-medium">{{ reservationForm.get('numberOfParticipants')?.value || 0 }}</span>
              </div>
              <div class="flex justify-between mt-2 pt-2 border-t border-gray-200">
                <span class="text-gray-900 font-bold">Total:</span>
                <span class="text-blue-600 font-bold">{{ calculateTotal().toFixed(2) }} MAD</span>
              </div>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              class="w-1/2 items/end py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              [disabled]="reservationForm.invalid || isSubmitting"
              [ngClass]="{'opacity-50 cursor-not-allowed': reservationForm.invalid || isSubmitting}"
            >
              <span *ngIf="!isSubmitting">Confirm Reservation</span>
              <span *ngIf="isSubmitting">Processing...</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Action Button -->
      <div class="px-6 py-4 border-t border-gray-200" *ngIf="!activity.availability || activity.status === 'CANCELED'">
        <button 
          class="w-full py-3 px-4 bg-blue-600 opacity-50 cursor-not-allowed text-white font-medium rounded-lg"
          disabled
        >
          {{ activity.status === 'CANCELED' ? 'Activity Canceled' : 'Fully Booked' }}
        </button>
      </div>
    </div>
    <app-footer/>
  `,
    styles: `
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  `
})
export class ActivityComponent implements OnInit {
  activity!: ActivityResponse;
  reservationForm!: FormGroup;
  isSubmitting = false;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private reservationService: ReservationService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivityById(id).subscribe({
        next: (data) => {
          this.activity = data;
          // Set default value for number of participants
          this.reservationForm.patchValue({
            activityId: this.activity.id,
            numberOfParticipants: 1
          });
        },
        error: (err) => this.toastService.error("Error", "Error while fetching data")
      });
    }
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      activityId: ['', Validators.required],
      numberOfParticipants: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000) 
      ]]
    });
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  isDeadlineNear(): boolean {
    const now = new Date();
    const deadline = new Date(this.activity.registrationDeadline);
    const diffInHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24;
  }

  calculateTotal(): number {
    const participants = this.reservationForm.get('numberOfParticipants')?.value || 0;
    return participants * this.activity.price;
  }

  incrementParticipants(): void {
    const currentValue = this.reservationForm.get('numberOfParticipants')?.value || 0;
    if (currentValue < this.activity.capacity) {
      this.reservationForm.patchValue({
        numberOfParticipants: currentValue + 1
      });
    }
  }

  decrementParticipants(): void {
    const currentValue = this.reservationForm.get('numberOfParticipants')?.value || 0;
    if (currentValue > 1) {
      this.reservationForm.patchValue({
        numberOfParticipants: currentValue - 1
      });
    }
  }

  submitReservation(): void {
    if (this.reservationForm.invalid) {
      this.toastService.error("Error", "Please fill in all required fields correctly");
      return;
    }

    this.isSubmitting = true;
    this.reservationService.createReservation(this.reservationForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.toastService.success("Success", "Reservation created successfully! we will reach you soon for confirmation");
        this.router.navigate(['/']);

      },
      error: (err) => {
        this.isSubmitting = false;
        this.toastService.error("Error", err.message || "Failed to create reservation");
      }
    });
  }
}
