import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from "../../shared/auth-navbar/auth-navbar.component";

@Component({
  selector: 'app-auth-template',
  imports: [
    RouterOutlet,
    AuthNavbarComponent
],
  templateUrl: './auth-template.component.html',
  styles: ``
})
export class AuthTemplateComponent {

}
