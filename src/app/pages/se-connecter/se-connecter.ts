import { Component } from '@angular/core';
import { Navbar } from "../../features/components/navbar/navbar";
import { Api } from '../../services/api'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-se-connecter',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './se-connecter.html',
  styleUrls: ['./se-connecter.css']   
})
export class SeConnecter {

  email: string = '';
  password: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private api: Api,
    private router: Router,
    private auth: AuthService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
  
    this.api.login(this.email, this.password).subscribe({
      next: (response) => {
  
        this.auth.saveToken(response.token);
  
        this.api.getProfile().subscribe({
          next: (user) => {
  
            // ✔ afficher message success
            this.successMessage = "Connexion réussie ✔";
            this.errorMessage = "";
  
            // ✔ attendre 1.2s puis rediriger
            setTimeout(() => {
              if (user.status === "doctor") {
                this.router.navigate(['/doctor/profile']);
              } else {
                this.router.navigate(['/user/profile']);
              }
            }, 1200);
  
          },
  
          error: () => {
            this.errorMessage = "Erreur chargement profil.";
          }
        });
  
      },
  
      error: () => {
        this.errorMessage = "Email ou mot de passe incorrect.";
        this.successMessage = "";
      }
    });
  }
}  