import { Component, inject, OnInit } from '@angular/core';
import Announcement from '../../models/announcement.interface';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { EquipmentIconPipe } from '../../pipes/equipment-icon.pipe';
import { ServiceIconPipe } from '../../pipes/service-icon.pipe';
import User from '../../models/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,ServiceIconPipe,EquipmentIconPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private httpClient: HttpClient = inject(HttpClient);

  title: string = 'Trouvez votre colocation idéale';
  subtitle:string = 'Découvrez des espaces de vie partagés exceptionnels dans toute la France';
  heroImage:string = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  // Statistiques
  totalAnnonces :number = 1247;
  villesDisponibles:number  = 45;
  colocatairesActifs:number  = 3829;
  announcements: Announcement[] = [];

  ngOnInit(): void {

    this.httpClient.get<Announcement[]>(
      'https://atelier-de-toril.fr/' + 'api/announcements',
      {
        headers: {
          'accept': 'application/json',
        },
    }
    ).subscribe({
      next: (data) => {
        this.announcements = data;
        console.log(this.announcements);
      }

    });

  }
}
