import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../component/table/table.component";
import { Page } from '../../../../core/models/Page';
import { Observable } from 'rxjs';
import { ActivityService } from '../../../../core/services/activity.service';
import { ActivityResponse } from '../../../../core/models/Activity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  imports: [CommonModule, TableComponent],
  template: `
  <div class="container mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">Activities List</h2>
  
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
