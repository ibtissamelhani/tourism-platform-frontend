import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../../core/models/Page';
import { PlaceResponse } from '../../../../core/models/Place';
import { PlaceService } from '../../../../core/services/place.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../../../component/table/table.component";

@Component({
  selector: 'app-places',
  imports: [
    CommonModule,
    TableComponent
],
  template: `
  <ng-container *ngIf="places$ | async as places">
        <app-table
          [data]="places.content"
          [columns]="columns"
          [itemsPerPage]="places.size"
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
    { key: 'type.name', label: 'Type' } 
  ];

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.places$ = this.placeService.getAllPlaces();
  }
}
