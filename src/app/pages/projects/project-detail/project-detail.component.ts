import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../components/card/card.component';
import { ButtonCTAComponent } from '../../../components/button-cta/button-cta.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardComponent, ButtonCTAComponent],
  template: `
    <section class="hero-project py-20 bg-gradient-to-r from-bleu-fonce to-gris-acier text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-montserrat font-bold mb-6">
          {{ projet?.titre }}
        </h1>
        <p class="text-xl max-w-2xl mx-auto">
          {{ projet?.description }}
        </p>
      </div>
    </section>

    <section class="project-details py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce mb-8">
              {{ 'PROJECT_DETAIL.INFORMATIONS' | translate }}
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="font-medium text-bleu-fonce">{{ 'PROJECT_DETAIL.STATUT' | translate }}:</span>
                <span class="text-gris-acier">{{ projet?.statut }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-bleu-fonce">{{ 'PROJECT_DETAIL.BUDGET' | translate }}:</span>
                <span class="text-gris-acier">{{ projet?.budget | currency:'XOF':'symbol':'1.0-0' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-bleu-fonce">{{ 'PROJECT_DETAIL.CATEGORIE' | translate }}:</span>
                <span class="text-gris-acier">{{ projet?.categorie }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-bleu-fonce">{{ 'PROJECT_DETAIL.DATE_DEBUT' | translate }}:</span>
                <span class="text-gris-acier">{{ projet?.date_debut | date:'dd/MM/yyyy' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-bleu-fonce">{{ 'PROJECT_DETAIL.DATE_FIN' | translate }}:</span>
                <span class="text-gris-acier">{{ projet?.date_fin | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce mb-8">
              {{ 'PROJECT_DETAIL.GALERIE' | translate }}
            </h2>

            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <span class="text-gris-acier">{{ 'PROJECT_DETAIL.IMAGE_1' | translate }}</span>
              </div>
              <div class="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <span class="text-gris-acier">{{ 'PROJECT_DETAIL.IMAGE_2' | translate }}</span>
              </div>
              <div class="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <span class="text-gris-acier">{{ 'PROJECT_DETAIL.IMAGE_3' | translate }}</span>
              </div>
              <div class="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <span class="text-gris-acier">{{ 'PROJECT_DETAIL.IMAGE_4' | translate }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <app-button-cta
            [texte]="'PROJECT_DETAIL.INVESTIR' | translate"
            variante="primaire"
            taille="grand"
            (onClick)="investirDansProjet()"
          ></app-button-cta>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ProjectDetailComponent implements OnInit {
  projet: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // TODO: Charger les données du projet depuis le backend
    this.chargerProjet(id);
  }

  chargerProjet(id: string) {
    // Simulation des données pour le développement
    this.projet = {
      id: id,
      titre: 'Projet Résidentiel Premium',
      description: 'Un complexe résidentiel de luxe avec toutes les commodités modernes.',
      statut: 'En cours',
      budget: 500000000,
      categorie: 'Immobilier',
      date_debut: new Date('2024-01-01'),
      date_fin: new Date('2025-12-31')
    };
  }

  investirDansProjet() {
    // TODO: Rediriger vers la page d'investissement
    console.log('Investir dans le projet:', this.projet.id);
  }
}