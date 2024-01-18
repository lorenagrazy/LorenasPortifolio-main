import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetlifyFormsService } from 'src/app/services/netlify-forms.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  {
  
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', [Validators.required]],  // Corrigido Validators.email para Validators.required
    message: ['', Validators.required],
  });

  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private netlifyForms: NetlifyFormsService,
  ) { }

  onSubmit() {
    // Criar um objeto do tipo Feedback com as propriedades necessárias
    const contact: Contact = {
      name: this.contactForm.value.name ?? '', // ou this.contactForm.value.name || ''
      email: this.contactForm.value.email ?? '',
      phone: this.contactForm.value.phone ?? '',
      message: this.contactForm.value.message ?? '',
   
    };
    
    this.netlifyForms.submitFeedback(contact).subscribe(
      () => {
        this.contactForm.reset();
        this.router.navigateByUrl('/success');
      },
      err => {
        this.errorMsg = err;
      }
    );
  }

  closeError() {
    this.errorMsg = '';
  }
}
