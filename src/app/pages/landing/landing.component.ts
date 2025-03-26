import { Component } from '@angular/core';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-landing',
  imports: [
    NavbarComponent,
    FooterComponent
],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent {

}
