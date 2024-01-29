import { Component, OnInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';


@Component({
  selector: 'app-soft',
  templateUrl: './soft.component.html',
  styleUrls: ['./soft.component.css']
})
export class SoftComponent implements OnInit {

  ngOnInit(): void {
    // Configuração do ScrollReveal
    ScrollReveal().reveal('.container', {
      delay: 200,
      distance: '20px',
      origin: 'bottom',
      easing: 'ease-in-out',
      interval: 200
    });
  }
}
