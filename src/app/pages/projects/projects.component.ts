import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { ApiService } from '../../services/api.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../../services/content.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero-projects py-20 bg-gradient-to-r from-bleu-fonce to-gris-acier text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-montserrat font-bold mb-6">
          {{ 'PROJECTS.TITRE' | translate }}
        </h1>
        <p class="text-xl max-w-2xl mx-auto">
          {{ 'PROJECTS.SOUS_TITRE' | translate }}
        </p>
      </div>
    </section>

    <section class="projets-realises-section py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce text-center mb-16 slide-up">
          Projets Réalisés
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let projet of realises; let i = index" class="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg slide-up">
            <h3 class="text-2xl font-montserrat font-bold text-bleu-fonce mb-4">{{ projet.titre }}</h3>
            <p class="text-gris-acier mb-4">{{ projet.description }}</p>
            <div class="grid grid-cols-2 gap-4">
              <img *ngFor="let image of projet.images" [src]="image" [alt]="projet.titre" class="w-full h-32 object-cover rounded">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="projets-encours-section py-20 bg-gray-50/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce text-center mb-16 slide-up">
          Projets en Cours
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let projet of enCours; let i = index" class="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg slide-up">
            <h3 class="text-2xl font-montserrat font-bold text-bleu-fonce mb-4">{{ projet.titre }}</h3>
            <div class="mb-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-accent-jaune h-2 rounded-full" [style.width.%]="projet.avancement"></div>
              </div>
              <p class="text-sm text-gris-acier mt-1">{{ projet.avancement }}% terminé</p>
            </div>
            <p class="text-gris-acier mb-2"><strong>Partenaires:</strong> {{ projet.partenaires }}</p>
            <p class="text-gris-acier"><strong>Coût:</strong> {{ projet.cout }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="appel-investisseurs-section py-20 bg-bleu-fonce text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold mb-6 slide-up">
          {{ 'PROJECTS.APPEL_INVESTISSEURS' | translate }}
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto slide-up">
          Rejoignez nos projets d'investissement participatif.
        </p>
        <button (click)="appelInvestisseurs()" class="bg-accent-jaune text-bleu-fonce px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-orange transition-colors">
          {{ 'PROJECTS.APPEL_INVESTISSEURS' | translate }}
        </button>
      </div>
    </section>
  `,
  styles: []
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projectsData: any;
  realises: any[] = [];
  enCours: any[] = [];

  constructor(private apiService: ApiService, private contentService: ContentService, private router: Router) {}

  ngOnInit() {
    this.projectsData = this.contentService.getProjectsData();
    this.realises = this.projectsData.realisés;
    this.enCours = this.projectsData.enCours;
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    gsap.utils.toArray('.slide-up').forEach((element: any, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  appelInvestisseurs() {
    this.router.navigate(['/investissement']);
  }
}