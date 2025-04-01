import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../../../component/table/table.component';
import { UserService } from '../../../../core/services/user.service';
import { TableColumn } from '../../../../core/models/TableColumn';
import { ToastService } from '../../../../core/services/toast.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableComponent, RouterLink],
  template: `
    <div class="container mx-auto py-6">
      <div class="mb-6">
        <h2 class="text-xl font-medium text-gray-700 mb-3">All Users</h2>
        <app-table
          [data]="users"
          [columns]="userColumns"
          [itemsPerPage]="10"
          (delete)="onDeleteUser($event)"
          (edit)="onEditUser($event)"
        ></app-table>
      </div>

      <div class="mb-6">
        <div class="sm:flex sm:items-center sm:justify-between mb-2">
          <div>
            <div class="flex items-center gap-x-3">
              <h2 class="text-lg font-medium text-yellow-500 ">
                Guides
              </h2>
            </div>
            <p class="mt-1 text-sm text-gray-700 ">
              List of all guides registered in the system.
            </p>
          </div>
            <button
            routerLink="add"
              class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-yellow-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-yellow-600 dark:hover:bg-yellow-500 dark:bg-yellow-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Add Guide</span>
            </button>
   
        </div>
        <app-table
          [data]="guideUsers"
          [columns]="userColumns"
          [itemsPerPage]="5"
          (delete)="onDeleteUser($event)"
          (edit)="onEditUser($event)"
        ></app-table>
      </div>
    </div>
  `,
  styles: ``,
})
export class UsersComponent {
  users: any[] = [];
  guideUsers: any[] = [];

  userColumns: TableColumn[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'role', label: 'Role' },
    { key: 'active', label: 'is Active' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'updatedAt', label: 'Updated At' },
  ];

  constructor(private userService: UserService, private toastService: ToastService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.content;
      this.guideUsers = this.users.filter((user) => user.role === 'GUIDE');
    });
  }

  onDeleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: (message) => {
          this.toastService.success('Success', message);
          this.loadUsers();
        },
        error: (err) => {
          const msg = err.error?.message || err.error || 'Delete failed';
          this.toastService.error('Error', msg);
        }
      });
    }
  }

  onEditUser(id: string): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

}
