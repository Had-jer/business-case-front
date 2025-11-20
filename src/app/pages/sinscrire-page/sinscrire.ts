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

    // Date correcte pour le backend (on ne modifie rien, format YYYY-MM-DD OK)
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
        this.errorMessage = ""; // efface erreur précédente
        this.successMessage = "Inscription réussie ! Bienvenue 🎉";

        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 1500);
      },

      error: (err) => {
        console.error("Erreur d'inscription :", err);
        this.successMessage = "";

        // Cas email déjà utilisé
        if (err.status === 500 && err.error.detail?.includes("Duplicate entry")) {
          this.errorMessage = "Cet email est déjà utilisé. Veuillez en choisir un autre.";
          return;
        }

        // Par défaut
        this.errorMessage = "Une erreur interne est survenue. Veuillez réessayer.";
      }
    });
  }
}





// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Api } from '../../services/api';  // <-- import service API

// @Component({
//   selector: 'app-sinscrire',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './sinscrire.html',
//   styleUrls: ['./sinscrire.css']
// })
// export class SinscrirePage {
//   firstName: string = '';
//   lastName: string = '';
//   birthDate: string = '';
//   status: string = '';
//   phone: string = '';
//   email: string = '';
//   password: string = '';
//   confirmPassword: string = '';

//   constructor(private router: Router, private api: Api) {}

 

//     const data = {
//       firstName: this.firstName,
//       lastName: this.lastName,
//       birthDate: this.birthDate,
//       status: this.status,
//       phone: this.phone,
//       email: this.email,
//       password: this.password
//     };



//     onSubmit(event: Event) {
//       // Pour ne pas refresh 
//       event.preventDefault();
//       if (this.password !== this.confirmPassword) {
//         alert("Les mots de passe ne correspondent pas !");
//         return;
//       }
//       // birthDate est déjà "YYYY-MM-DD"
//       let formattedDate = this.birthDate;
    
//       // Si ton backend veut YYYY/MM/DD au lieu de YYYY-MM-DD :
//       formattedDate = formattedDate.replace(/-/g, '/');
    
//       const data = {
//         firstName: this.firstName,
//         lastName: this.lastName,
//         birthDate: formattedDate,
//         status: this.status,
//         phone: this.phone,
//         email: this.email,
//         password: this.password,
//       };
    
//       console.log(data);
//       // this.api.register(data).subscribe(...)
//     }
//     this.api.register(data).subscribe({
//       next: (response) => {
//         console.log("Inscription réussie !", response);

//         // Optionnel : stocker un token si ton API en renvoie
//         // localStorage.setItem('token', response.token);

//         // Redirection vers les services ou espace membre
//         this.router.navigate(['/services']);
//       },
//       error: (err) => {
//         console.error("Erreur d'inscription :", err);
//         alert("Une erreur est survenue lors de l'inscription.");
//       }
//     });
//   }
// }
