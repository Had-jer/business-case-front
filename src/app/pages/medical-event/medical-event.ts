import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medical-event.html',
  styleUrls: ['./medical-event.css']
})
export class MedicalEventPage {

  patientId!: number;
  date: string = '';
  status: string = 'scheduled';
  eventCategory: string = 'hospitalisation';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private api: Api, private router: Router) {}

  submitEvent(event: Event) {
    event.preventDefault();

    const eventData = {
      patient: Number(this.patientId), 
      date: this.date,
      status: this.status,
      eventCategory: this.eventCategory
    };

    console.log("Données envoyées :", eventData);

    this.api.createMedicalEvent(eventData).subscribe({
      next: () => {
        this.successMessage = "Événement créé avec succès ✔";
        this.errorMessage = "";

        // ⏳ Redirection après un petit délai
        setTimeout(() => {
          console.log("REDIRECTION…");
          this.router.navigate(['/doctor/profile']);
        }, 1200);
      },
      error: (err) => {
        console.error("Erreur création événement :", err);
        this.errorMessage = "Impossible de créer l’événement.";
        this.successMessage = "";
      }
    });
  }
}
