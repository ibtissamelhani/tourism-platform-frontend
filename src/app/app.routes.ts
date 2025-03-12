import { Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthTemplateComponent } from './layout/auth-template/auth-template.component';
import { RegisterComponent } from './authentication/register/register.component';

export const routes: Routes = [

  {path:'', component:LandingComponent},
  {path:'authentication', component:AuthTemplateComponent,
  children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
  ]
  },
  

];
