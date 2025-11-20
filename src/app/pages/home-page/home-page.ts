
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroSection } from '../../features/components/hero-section/hero-section';
import { ProjectIntroduction } from '../../features/components/project-introduction/project-introduction';
import { ProfilMedical } from '../../features/components/profil-medical/profil-medical';
import { Navbar } from '../../features/components/navbar/navbar';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [  Navbar,HeroSection, ProjectIntroduction, ProfilMedical],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']  
})
export class HomePage {
  constructor(private router: Router) {}

  goToConnexion() {
    this.router.navigate(['/connexion']);
  }
}
