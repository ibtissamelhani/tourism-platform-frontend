import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-lougout-button',
  imports: [],
  template:`
  <a (click)="logout()" class="cursor-pointer">Logout</a>
  `,
  styles: ``
})
export class LougoutButtonComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['authentication/login']);
  }
}
