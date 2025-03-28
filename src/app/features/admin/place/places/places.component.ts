import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../../core/models/Page';
import { PlaceResponse } from '../../../../core/models/Place';
import { PlaceService } from '../../../../core/services/place.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../../../component/table/table.component";
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-places',
  imports: [
    CommonModule,
    TableComponent,
    RouterLink
],
  template: `
   <div class="sm:flex sm:items-center sm:justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">List of Places</h2>
        <button 
        routerLink="/admin/create-place"
        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide font-bold text-white transition-colors duration-200 bg-yellow-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-yellow-600 dark:hover:bg-yellow-500 dark:bg-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Add new Place</span>
        </button>
  </div>
  <ng-container *ngIf="places$ | async as places">
        <app-table
          [data]="places.content"
          [columns]="columns"
          [itemsPerPage]="places.size"
          (delete)="onDeletePlace($event)"
        ></app-table>
  </ng-container>
  `,
  styles: ``
})
export class PlacesComponent implements OnInit {
  places$!: Observable<Page<PlaceResponse>>;

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
    { key: 'type', label: 'Type' } ,
  ];

  constructor(private placeService: PlaceService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.places$ = this.placeService.getAllPlaces();
  }

  onDeletePlace(id: string): void {
    if (confirm('Are you sure you want to delete this place?')) {
      this.placeService.deletePlace(id).subscribe({
        next: (res) => {
          this.toastService.success('Success', res);
          this.places$ = this.placeService.getAllPlaces(); 
        },
        error: (err) => {
          const msg = err.error?.message || err.error || 'Failed to delete place';
          this.toastService.error('Error', msg);
        }
      });
    }
  }
}
