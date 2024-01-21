import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  contactForm!: FormGroup; // Adicione o operador "!" para indicar que será inicializado no construtor
  isContactFormSubmitted = false;
  successMessage = ''; // Mensagem de sucesso

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();
  
    const formData = this.contactForm.value;
    formData['form-name'] = 'contact';
    const headers = new HttpHeaders({
      Accept: 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    this.http
      .post('/', new URLSearchParams(formData).toString(), { headers, responseType: 'text' })
      .subscribe(() => {
        this.isContactFormSubmitted = true;
        this.successMessage = "Thank you for reaching out! Your message has been successfully sent. I'll get back to you as soon as I can.";
  
        // Reset other form fields or perform any other necessary actions
      });
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
