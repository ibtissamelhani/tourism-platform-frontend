import { Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthTemplateComponent } from './layout/auth-template/auth-template.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [

  {path:'', component:LandingComponent},
  {path:'about', component:AboutComponent},
  {path:'authentication', component:AuthTemplateComponent,
  children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
  ]
  },
  

];
