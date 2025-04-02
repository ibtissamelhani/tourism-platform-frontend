import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../component/table/table.component";
import { ReservationService } from '../../../../core/services/reservation.service';
import { Page } from '../../../../core/models/Page';
import { ReservationResponse } from '../../../../core/models/Reservation';

@Component({
  selector: 'app-reservations',
  imports: [TableComponent],
  template: `
   <h2 class="text-lg font-medium text-gray-800 dark:text-white mb-4">List of Reservations</h2>
   <app-table
    [data]="reservations.content"
    [columns]="columns"
    [itemsPerPage]="reservations.size"
    (delete)="onDelete($event)"
    (edit)="onEdit($event)"
  ></app-table>
  `,
  styles: ``
})
export class ReservationsComponent implements OnInit {
  reservations: Page<ReservationResponse> = { content: [], totalElements: 0, totalPages: 0, size: 10, number: 0 };
  columns=[
    { key: 'userFirstName', label: 'First Name' },
    { key: 'userLastName', label: 'Last Name' },
    { key: 'activity', label: 'Activity' },
    { key: 'numberOfParticipants', label: 'Participants' },
    { key: 'totalPrice', label: 'Total Price' },
    { key: 'reservationDate', label: 'Date' },
    { key: 'state', label: 'Status' }
  ];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(page = 0): void {
    this.reservationService.getAllReservations(page, 10, 'createdAt,asc').subscribe({
      next: (res) => this.reservations = res,
      error: (err) => console.error('Error loading reservations', err)
    });
  }

  onDelete(id: string): void {
    console.log('Delete reservation', id);
    // Add delete logic if needed
  }

  onEdit(id: string): void {
    console.log('Edit reservation', id);
    // Navigate or open modal to edit
  }
}
