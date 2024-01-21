import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  contactForm!: FormGroup;
  isContactFormSubmitted = false;
  isError = false;
  successMessage = '';
  showSuccessImage = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(evt: Event) {
    evt.preventDefault();

    const formData = this.contactForm.value;
    formData['form-name'] = 'contact';
    const headers = new HttpHeaders({
      Accept: 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post('/', new URLSearchParams(formData).toString(), { headers, responseType: 'text' })
      .subscribe(
        () => {
          this.isContactFormSubmitted = true;
          this.successMessage = "Thank you for reaching out! Your message has been successfully sent. I'll get back to you as soon as I can.";
          this.showSuccessImage = true;
          // Redirect to success component using the router
          this.router.navigate(['/success']);
        },
        (error) => {
          this.isError = true;
          this.errorMessage = "Oops! Something went wrong. Please try again later.";
        }
      );
  }

  get isEmailInvalid() {
    const emailControl = this.contactForm.get('email');
    return emailControl?.value && emailControl?.invalid && (emailControl.dirty || emailControl.touched);
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get body() {
    return this.contactForm.get('body');
  }
}
