import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      username: email,
      password: password,
    });
  }
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);

  }
  updateProfile(data: any) {
    return this.http.patch(`${this.baseUrl}/profile`, data);
  }
  deleteAccount() {
    return this.http.delete(`${this.baseUrl}/profile`);
  }
  createMedicalEvent(data: any) {
    return this.http.post(`${this.baseUrl}/medicalEvent/create`, data);
  }
  getMedicalEvents() {
    return this.http.get(`${this.baseUrl}/medicalEvent`);
  }
  updateMedicalEvent(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/medicalEvent/update/${id}`, data);
  }
  getMedicalEventById(id: number) {
    return this.http.get(`http://localhost:8000/api/medicalEvent/${id}`);
  }


}
