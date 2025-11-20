import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile {

  user: any = {};
  medicalEvents: any[] = [];

  editingField: string = '';
  newValue: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private api: Api,
    private auth: AuthService,
    private router: Router
  ) {}
  loadMedicalEvents() {
    this.api.getMedicalEvents().subscribe({
      next: (events: any) => {
  
        // Cas 1 : tableau direct
        if (Array.isArray(events)) {
          this.medicalEvents = events;
        }
  
        // Cas 2 : API Platform (hydra:member)
        else if (events["hydra:member"]) {
          this.medicalEvents = events["hydra:member"];
        }
  
        // Cas 3 : Backend personnalisé { events: [...] }
        else if (events.events) {
          this.medicalEvents = events.events;
        }
  
        else {
          console.error("Format inconnu :", events);
        }
      },
  
      error: (err) => {
        console.error("Erreur récupération events :", err);
      }
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/connexion']);
  }

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (data) => {
        console.log("Profil reçu :", data);
        this.user = data;
        this.loadMedicalEvents();  
      },
      error: (err) => {
        console.error("Erreur récupération profil :", err);
      }
    });
  }

  editField(field: string) {
    this.editingField = field;
    this.newValue = this.user[field];
  }

  cancelEdit() {
    this.editingField = '';
    this.newValue = '';
  }

  saveField() {
    const updateData: any = {};
    updateData[this.editingField] = this.newValue;

    this.api.updateProfile(updateData).subscribe({
      next: () => {
        this.user[this.editingField] = this.newValue;
        this.successMessage = "Changement enregistré ✔";
        this.errorMessage = "";
        this.cancelEdit();
      },
      error: (err) => {
        console.error("Erreur modification :", err);
        this.successMessage = "";
        this.errorMessage = "Impossible de modifier cette information.";
      }
    });
  }
  // DELETE ACCOUNT
  deleteAccount() {
    if (!confirm("⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est définitive.")) {
      return;
    }
  
    this.api.deleteAccount().subscribe({
      next: () => {
        alert("Votre compte a été supprimé.");
        this.auth.logout();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Erreur suppression :", err);
        alert("Impossible de supprimer le compte.");
      }
    });
  }
  goToMedicalEvent() {
    this.router.navigate(['/medical-event']);
  }
  // affciher un medical event 
  viewEvent(id: number) {
    this.router.navigate(['/medical-event', id]);
  }
  
}
