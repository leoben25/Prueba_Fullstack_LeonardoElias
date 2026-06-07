import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-services',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = [];
  message = '';

  constructor(
    private fb: FormBuilder,
    private api: Api
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(1)]],
      duration: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadServices();
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

  saveService(): void {
    if (this.serviceForm.invalid) {
      this.message = 'Completa los campos obligatorios correctamente';
      return;
    }

    this.api.createService(this.serviceForm.value).subscribe({
      next: () => {
        this.message = 'Servicio registrado correctamente';
        this.serviceForm.reset();
        this.loadServices();
      },
      error: () => {
        this.message = 'Error al registrar servicio';
      }
    });
  }
}