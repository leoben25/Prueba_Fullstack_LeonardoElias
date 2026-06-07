import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  createService(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, data);
  }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings`);
  }

  createBooking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, data);
  }
}