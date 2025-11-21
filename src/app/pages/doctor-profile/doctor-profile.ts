import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './doctor-profile.html',
  styleUrls: ['./doctor-profile.css']
})
export class DoctorProfile {

  user: any = {};
  medicalEvents: any[] = [];


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
  
        // Cas 2 : API Platform 
        else if (events["hydra:member"]) {
          this.medicalEvents = events["hydra:member"];
        }
  
        // Backend personnalisé { events: [...] }
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
  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.loadMedicalEvents();
      }
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/connexion']);
  }
  viewEvent(id: number) {
    this.router.navigate(['/medical-event', id]);
  }
  goEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
  goToMedicalEvent() {
    this.router.navigate(['/medical-event']);
  }
  
  editEvent(eventId: number) {
    this.router.navigate(['/medical-event/edit', eventId]);
  }
  showPopup: boolean = false;
selectedEventId!: number;
selectedStatus: string = '';

openEditPopup(event: any) {
  this.showPopup = true;
  this.selectedEventId = event.id;
  this.selectedStatus = event.status; 
}

closePopup() {
  this.showPopup = false;
}

saveStatus() {
  const updatedData = {
    status: this.selectedStatus
  };

  this.api.updateMedicalEvent(this.selectedEventId, updatedData).subscribe({
    next: () => {
      // mettre à jour dans la liste locale
      const target = this.medicalEvents.find(e => e.id === this.selectedEventId);
      if (target) target.status = this.selectedStatus;

      this.closePopup();
    },
    error: () => {
      alert("Erreur lors de la mise à jour.");
    }
  });
}
  deleteAccount() {
    if (!confirm("Voulez-vous vraiment supprimer votre compte ?")) return;

    this.api.deleteAccount().subscribe({
      next: () => {
        this.auth.logout();
        this.router.navigate(['/connexion']);
      },
      error: (err) => console.error("Erreur suppression compte :", err)
    });
  }
}
