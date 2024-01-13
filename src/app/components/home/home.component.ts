import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    this.loadParticlesConfig();
    this.initTypedJS();
  }

  private loadParticlesConfig() {
    console.log('Loading particles config');
    const configPath = 'assets/particles-config.json';

    fetch(configPath)
      .then(response => response.json())
      .then(config => {
        (window as any).particlesJS('particles-js', config);
      })
      .catch(error => console.error('Error loading particles config:', error));
  }

  private initTypedJS() {
    const options = {
      strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
      loop: true,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
    };

    new Typed('.typing-text', options);
  }
}
