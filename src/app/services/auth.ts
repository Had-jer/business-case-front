import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Récupère le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Stocker un token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Déconnecte l'utilisateur
  logout(): void {
    localStorage.removeItem('token');
  }
}
