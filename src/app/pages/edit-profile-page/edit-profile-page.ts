import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile-page.html',
  styleUrls: ['./edit-profile-page.css'],
})
export class EditProfilePageComponent {

  email: string = '';
  phone_number: string = '';
  password: string = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private api: Api,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (user) => {
        this.email = user.email;
        this.phone_number = user.phoneNumber;  // <-- correct
      }
    });
  }

  saveChanges(event: Event) {
    event.preventDefault();
  
    const data: any = {
      email: this.email,
      phoneNumber: this.phone_number   // <-- CORRECT POUR SYMFONY
    };
  
    if (this.password.trim() !== '') {
      data.plainPassword = this.password;  // <-- CORRECT POUR SYMFONY
    }
  
    console.log("DATA SENT :", data);
  
    this.api.updateProfile(data).subscribe({
      next: () => {
        this.successMessage = "Modifications enregistrées ✔";
        setTimeout(() => {
          this.router.navigate(['/doctor/profile']);
        }, 1000);
      },
      error: (err) => {
        console.error("PATCH ERROR", err);
        this.errorMessage = "Erreur lors de la modification.";
      }
    });
  }
  

  logout() {
    this.auth.logout();
    this.router.navigate(['/connexion']);
  }

  goBack() {
    this.router.navigate(['/doctor/profil']);
  }
}
