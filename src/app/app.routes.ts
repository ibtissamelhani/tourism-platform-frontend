import { Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { AuthTemplateComponent } from './layout/auth-template/auth-template.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [

  {path:'', component:LandingComponent},
  {path:'about', component:AboutComponent},
  {path:'authentication', component:AuthTemplateComponent,
  children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
  ]
  },
  {path:'admin', component:AdminLayoutComponent,
    children:[
      {path:'dashboard', component:DashboardComponent}
    ]
  },
];
