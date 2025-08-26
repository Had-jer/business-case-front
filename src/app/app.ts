import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/components/navbar/navbar';
import { HeroSection } from "./features/components/hero-section/hero-section";
import { ProjectIntroduction } from "./features/components/project-introduction/project-introduction";
import { ProfilMedical } from "./features/components/profil-medical/profil-medical";
import { Messagerie } from "./features/components/messagerie/messagerie";
import { Footer } from "./features/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection, ProjectIntroduction, ProfilMedical, Messagerie, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bc-angular');
}
