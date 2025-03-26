import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from '../../core/models/TableColumn';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  template: `
   <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th 
              *ngFor="let column of columns" 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              (click)="sortColumn(column)"
            >
              {{ column.label }}
              <span *ngIf="column.sortable">
                {{ getSortIcon(column) }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            *ngFor="let item of paginatedData" 
            class="hover:bg-gray-50 transition duration-200"
          >
            <td 
              *ngFor="let column of columns" 
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ item[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button 
            (click)="previousPage()" 
            [disabled]="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Précédent
          </button>
          <button 
            (click)="nextPage()" 
            [disabled]="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Page 
              <span class="font-medium">{{ currentPage }}</span>
              sur 
              <span class="font-medium">{{ totalPages }}</span>
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                (click)="previousPage()" 
                [disabled]="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Précédent
              </button>
              
              <ng-container *ngFor="let page of getPageNumbers()">
                <button 
                  *ngIf="page !== '...'"
                  (click)="goToPage(+page)"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
                  [ngClass]="{
                    'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': currentPage === +page,
                    'text-gray-500 hover:bg-gray-50': currentPage !== +page
                  }"
                >
                  {{ page }}
                </button>
                <span 
                  *ngIf="page === '...'"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              </ng-container>
              
              <button 
                (click)="nextPage()" 
                [disabled]="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Suivant
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() itemsPerPage: number = 10;

  currentPage: number = 1;
  totalPages: number = 1;
  sortColumn!: (column: TableColumn) => void;
  getSortIcon!: (column: TableColumn) => string;

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  ngOnInit() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    
    // Initialisation du tri et de l'icône de tri
    this.sortColumn = (column: TableColumn) => {
      // Logique de tri à implémenter
    };

    this.getSortIcon = (column: TableColumn) => {
      // Logique d'affichage de l'icône de tri
      return '▼'; // Exemple simple
    };
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): (number | string)[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 7) {
      // Si peu de pages, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Stratégie pour afficher les pages avec des points de suspension
      if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  }
}
