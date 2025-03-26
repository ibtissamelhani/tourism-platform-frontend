import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../component/table/table.component";
import { Page } from '../../../../core/models/Page';
import { Observable } from 'rxjs';
import { ActivityService } from '../../../../core/services/activity.service';
import { ActivityResponse } from '../../../../core/models/Activity';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, TableComponent, RouterLink],
  template: `
  <div class="container mx-auto p-4">
  <div class="sm:flex sm:items-center sm:justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">List of Activities</h2>
        <button 
        routerLink="/admin/create-activity"
        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide font-bold text-white transition-colors duration-200 bg-yellow-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-yellow-600 dark:hover:bg-yellow-500 dark:bg-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Add new Activity</span>
        </button>
  </div>
  
  <app-table
    *ngIf="activities$ | async as activities"
    [data]="activities.content"
    [columns]="columns"
    [itemsPerPage]="activities.size"
  ></app-table>
</div>`,
  styles: ``
})
export class ActivitiesComponent {
  activities$: Observable<Page<ActivityResponse>>;

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price ($)' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'date', label: 'Date' },
    { key: 'availability', label: 'Available', format: (value: boolean) => value ? '✅' : '❌' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'place', label: 'Place' },
  ];

  constructor(private activityService: ActivityService) {
    this.activities$ = this.activityService.getActivities();
  }
}
