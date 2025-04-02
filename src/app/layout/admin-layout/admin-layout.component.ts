import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LougoutButtonComponent } from "../../component/lougout-button/lougout-button.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LougoutButtonComponent],
  templateUrl: './admin-layout.component.html',
  styles: ''
})
export class AdminLayoutComponent {

}
