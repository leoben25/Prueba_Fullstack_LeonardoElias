import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class Bookings implements OnInit {
  bookingForm!: FormGroup;
  services: any[] = [];
  bookings: any[] = [];
  message = '';

  constructor(
    private fb: FormBuilder,
    private api: Api
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      client_name: ['', Validators.required],
      client_email: ['', [Validators.required, Validators.email]],
      service_id: ['', Validators.required],
      booking_date: ['', Validators.required],
      booking_time: ['', Validators.required]
    });

    this.loadServices();
    this.loadBookings();
  }

  loadServices(): void {
    this.api.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: () => {
        this.message = 'Error al cargar servicios';
      }
    });
  }

  loadBookings(): void {
    this.api.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: () => {
        this.message = 'Error al cargar reservas';
      }
    });
  }

  saveBooking(): void {
    if (this.bookingForm.invalid) {
      this.message = 'Completa todos los campos correctamente';
      return;
    }

    this.api.createBooking(this.bookingForm.value).subscribe({
      next: () => {
        this.message = 'Reserva registrada correctamente';
        this.bookingForm.reset();
        this.loadBookings();
      },
      error: () => {
        this.message = 'Error al registrar reserva';
      }
    });
  }
}