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
import { PlaceUpdateComponent } from './features/admin/place/place-update/place-update.component';
import { UsersComponent } from './features/admin/user/users/users.component';
import { UserEditComponent } from './features/admin/user/user-edit/user-edit.component';
import { UserAddComponent } from './features/admin/user/user-add/user-add.component';
import { UpdateActivityComponent } from './features/admin/activity/update-activity/update-activity.component';
import { ProfileComponent } from './features/tourist/profile/profile.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ReservationsComponent } from './features/admin/reservation/reservations/reservations.component';
import { ActivitiesComponent as activities} from './pages/activities/activities.component'
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/role.guard';
import { ForbiddenComponent } from './pages/error/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
export const routes: Routes = [

  {path:'', component:LandingComponent},
  { path: 'forbidden', component: ForbiddenComponent },
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'activity/:id', component:ActivityComponent, canActivate: [authGuard]},
  {path:'activities', component:activities},
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
      {path:'edit-activity/:id', component:UpdateActivityComponent},
      {path:'categories', component:CategoriesComponent},
      {path:'places', component:PlacesComponent},
      {path:'create-place', component:CreatePlaceComponent},
      {path: 'places/edit/:id', component: PlaceUpdateComponent },
      {path: 'users', component: UsersComponent },
      {path: 'users/edit/:id', component: UserEditComponent },
      {path: 'users/add', component: UserAddComponent },
      {path: 'reservations', component: ReservationsComponent },
    ],
    canActivate: [authGuard, adminGuard]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },

];
