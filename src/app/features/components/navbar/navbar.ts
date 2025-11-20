import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  constructor(public router: Router,
    
  ) {}

  goHome() {
    this.router.navigate(['/']);
  }
goToSinscrire() {
    this.router.navigate(['/sinscrire']);
  }
  goToConnexion() {
    this.router.navigate(['/connexion']);
  }

  
}
