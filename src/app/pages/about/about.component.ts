import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-about',
  imports: [NavbarComponent, FooterComponent],
  template: './about.component.html',
  styles: ``
})
export class AboutComponent {

}
