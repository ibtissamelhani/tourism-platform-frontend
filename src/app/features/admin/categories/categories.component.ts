import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../component/table/table.component";
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/Category';
import { Observable } from 'rxjs';
import { Page } from '../../../core/models/Page';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-categories',
  imports: [TableComponent, CommonModule, ReactiveFormsModule],
  template: `
  <div class="container mx-auto p-4">
  <div class="sm:flex sm:items-center sm:justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">List of categories</h2>
        <!-- Modal toggle -->
        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          add new category
        </button>
        <!-- Main modal -->
        <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            add new category
                        </h3>
                        <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5">
                        <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()" class="space-y-4" action="#">
                          <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Category Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              formControlName="name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="Category..."
                            />
                          </div>
                          <button
                            type="submit"
                            [disabled]="categoryForm.invalid"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                          >
                            Add
                          </button>                        
                        </form>
                    </div>
                </div>
            </div>
        </div>   
  </div>
  
  <app-table
    *ngIf="categories$ | async as categories"
    [data]="categories.content"
    [columns]="columns"
    [itemsPerPage]="categories.size"
    (delete)="onDeleteCategory($event)"
  ></app-table>
</div>`,
  styles: ``
})
export class CategoriesComponent{
  categories$: Observable<Page<Category>>;
  columns = [
    { key: 'name', label: 'Category Name', sortable: true },
    { key: 'actions', label: 'Actions' }
  ];

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toastService: ToastService) {
    this.categories$ = this.categoryService.getAll();
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const newCategory = this.categoryForm.value;
    this.categoryService.createCategory(newCategory).subscribe({
      next: () => {
        this.toastService.success('success','Category added successfully');
        this.categoryForm.reset();
      },
      error: (err) => {
        this.toastService.error('error', err.error.message || 'An unexpected error occurred');

      }
    });
  }

  onDeleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (res) => {
          this.toastService.success('Success', res);
        },
        error: (err) => {
          const msg = err.error?.message || err.error || 'Delete failed';
          this.toastService.error('Error', msg);
        }
      });
    }
  }

}
