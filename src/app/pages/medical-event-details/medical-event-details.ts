import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-medical-event-details',
  standalone: true,
  templateUrl: './medical-event-details.html',
  styleUrls: ['./medical-event-details.css']
})
export class MedicalEventDetailsPage {

  event: any = null;
  errorMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private api: Api
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.api.getMedicalEventById(id).subscribe({
      next: (data) => this.event = data,
      error: () => this.errorMessage = "Erreur lors du chargement de l'événement."
    });
  }
}
