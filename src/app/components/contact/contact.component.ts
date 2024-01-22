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
          this.router.navigate(['/success']);

          setTimeout(() => {
            this.router.navigate(['/contact']);
          }, 10000);
        },
        () => {
          this.isError = true;
          this.router.navigate(['/error']);
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
