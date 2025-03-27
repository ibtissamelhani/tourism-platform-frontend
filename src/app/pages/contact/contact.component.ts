import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styles: ``
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Here you would typically send the form data to a backend service
      console.log(this.contactForm.value);
      this.isSubmitted = true;

      // Reset form after 3 seconds
      setTimeout(() => {
        this.isSubmitted = false;
        this.contactForm.reset();
      }, 3000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Helper method to check form control validity
  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }
}
