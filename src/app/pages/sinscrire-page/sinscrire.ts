import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-sinscrire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sinscrire.html',
  styleUrls: ['./sinscrire.css']
})
export class SinscrirePage {

  firstName: string = '';
  lastName: string = '';
  birthDate: string = '';
  status: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  speciality: string = '';

  successMessage: string = '';
  errorMessage: string = '';  

  constructor(private router: Router, private api: Api) {}

  onSubmit(event: Event) {
    event.preventDefault();

    // Vérif mots de passe
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    // Vérif numéro FR
    const phoneRegex = /^0[1-9][0-9]{8}$/;
    if (!phoneRegex.test(this.phone)) {
      this.errorMessage = "Veuillez entrer un numéro de téléphone français valide.";
      return;
    }

    // Date format YYYY-MM-DD OK)
    let formattedDate = this.birthDate;

    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: formattedDate,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      status: this.status,
      phoneNumber: this.phone,
      speciality: this.status === 'doctor' ? this.speciality : null

    };

    console.log("Données envoyées :", data);

    // Envoi à l'API
    this.api.register(data).subscribe({
      next: (response) => {
        // effacer erreur précédente
        this.errorMessage = ""; 
        this.successMessage = "Inscription réussie ! Bienvenue 🎉";

        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 1500);
      },

      error: (err) => {
        console.error("Erreur d'inscription :", err);
        this.successMessage = "";

        // CAS DE EMAIL DEJA UTILISÉ 
        if (err.status === 500 && err.error.detail?.includes("Duplicate entry")) {
          this.errorMessage = "Cet email est déjà utilisé. Veuillez en choisir un autre.";
          return;
        }

        // Message d'erreur par défaut 
        this.errorMessage = "Une erreur interne est survenue. Veuillez réessayer.";
      }
    });
  }
}



