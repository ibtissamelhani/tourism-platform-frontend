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

@Component({
  selector: 'app-landing',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterLink
],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent implements OnInit {

  activities$!: Observable<Page<ActivityResponse>>;
  constructor(private activityService: ActivityService, private toast: ToastService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities() {
    this.activities$ = this.activityService.getActivities(0, 6, 'date,desc');
  }
  
}
