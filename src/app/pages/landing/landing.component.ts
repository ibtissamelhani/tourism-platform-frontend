import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { ActivityService } from '../../core/services/activity.service';
import { ToastService } from '../../core/services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../../core/models/Page';
import { ActivityResponse } from '../../core/models/Activity';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-landing',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterLink,
    ReactiveFormsModule
],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent implements OnInit {

  activities$!: Observable<Page<ActivityResponse>>;
  activitySearchForm!: FormGroup;
  categories: any[] = [];

  constructor(private activityService: ActivityService, 
    private toast: ToastService, 
    private router: Router, 
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    
  }

  ngOnInit(): void {this.activitySearchForm = this.fb.group({
    name: [''],
    categoryId: [''],
    startDate: [''],
    endDate: ['']
  });

  this.fetchActivities();
  this.categoryService.getAll().subscribe(res => this.categories = res.content || []);

  }

  fetchActivities() {
    this.activities$ = this.activityService.getActivities(0, 6, 'date,desc');
  }
  
  searchActivities(): void {
    const searchDTO = this.activitySearchForm.value;
    this.activities$ = this.activityService.searchActivities(searchDTO);
  }
}
