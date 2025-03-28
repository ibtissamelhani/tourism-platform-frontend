import { Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { AuthTemplateComponent } from './layout/auth-template/auth-template.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ActivitiesComponent } from './features/admin/activity/activities/activities.component';
import { CreateActivityComponent } from './features/admin/activity/create-activity/create-activity.component';
import { CategoriesComponent } from './features/admin/categories/categories.component';
import { PlacesComponent } from './features/admin/place/places/places.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CreatePlaceComponent } from './features/admin/place/create-place/create-place.component';

export const routes: Routes = [

  {path:'', component:LandingComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'authentication', component:AuthTemplateComponent,
  children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
  ]
  },
  {path:'admin', component:AdminLayoutComponent,
    children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'activities', component:ActivitiesComponent},
      {path:'create-activity', component:CreateActivityComponent},
      {path:'categories', component:CategoriesComponent},
      {path:'places', component:PlacesComponent},
      {path:'create-place', component:CreatePlaceComponent},
    ]
  },
];
