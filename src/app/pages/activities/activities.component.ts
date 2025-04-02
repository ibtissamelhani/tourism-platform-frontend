import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../core/models/Page';
import { ActivityResponse } from '../../core/models/Activity';
import { ActivityService } from '../../core/services/activity.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
  <app-navbar/>
    <div class="container mx-auto px-4 py-8">
    <div class="text-center my-16">
          <h2 class="text-3xl font-bold mb-4">Popular Experiences in Morocco</h2>
          <div
      class="w-24 h-1 bg-gradient-to-r from-blue-900 to-yellow-600 mx-auto mb-6"
    ></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of authentic Moroccan experiences
            that will make your journey unforgettable
          </p>
        </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ng-container
          *ngFor="let activity of (activities$ | async)?.content || []"
        >
          <div
            class="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                [src]="
                  activity.imageUrls && activity.imageUrls.length > 0
                    ? activity.imageUrls[0]
                    : 'https://placehold.co/400x300'
                "
                [alt]="activity.name"
                class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-bold py-1 px-3 rounded-full"
              >
                {{ activity.category }}
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-2">
                <span class="material-symbols-outlined text-yellow-500 mr-1"
                  >star</span
                >
                <span class="font-medium">5</span>
                <span class="text-gray-500 ml-1">(4444 reviews)</span>
              </div>
              <h3 class="font-bold text-xl mb-2">{{ activity.name }}</h3>
              <p class="text-gray-600 mb-4">
                {{ (activity.description | slice : 0 : 100) + '...' }}
              </p>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-lg font-bold">{{ activity.price }}</span>
                  <span class="text-gray-500"> / person</span>
                </div>
                <button
                  [routerLink]="['/activity', activity.id]"
                  class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </ng-container>
      </div>

      <!-- Pagination controls -->
      <div
        class="flex justify-center mt-8"
        *ngIf="((activities$ | async)?.totalPages ?? 0) > 1"
      >
        <button
          *ngFor="
            let page of [].constructor((activities$ | async)?.totalPages);
            let i = index
          "
          (click)="onPageChange(i)"
          class="mx-1 px-3 py-1 rounded"
          [ngClass]="{
            'bg-blue-500 text-white': currentPage === i,
            'bg-gray-200': currentPage !== i
          }"
        >
          {{ i + 1 }}
        </button>
      </div>
    </div>
  <app-footer/>  
  `,
  styles: ``,
})
export class ActivitiesComponent implements OnInit {
  activities$!: Observable<Page<ActivityResponse>>;
  currentPage = 0;
  pageSize = 9;
  sortOrder = 'createdAt,desc';

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activities$ = this.activityService.getActivities(
      this.currentPage,
      this.pageSize,
      this.sortOrder
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadActivities();
  }
}
