import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Announcement from '../../models/announcement.interface';

@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [],
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.css'
})
export class AnnouncementDetailComponent implements OnInit{


  private route : ActivatedRoute = inject(ActivatedRoute); // Récuperer la toute actuelle
		//Propriété représentant le parmaètre id
  announcement : Announcement|null = null;

	ngOnInit() {
	    // Récupération directe (snapshot)
	    const id: string|null = this.route.snapshot.paramMap.get('id'); // ✅

      if(id && !isNaN(parseInt(id))){
        // API
        
      }else{
        // redirection
      }
	}





}
