import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../services/content.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="dashboard-header py-12 text-white backdrop-blur-md bg-gradient-to-r from-bleu-fonce to-gris-acier">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-montserrat font-bold mb-4 fade-in">
          {{ data?.titre }}
        </h1>
        <p class="text-xl text-gray-200 fade-in">{{ data?.bienvenue }}</p>
      </div>
    </section>

    <section class="stats-section py-12 bg-gray-50/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow slide-up">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-montserrat font-bold text-bleu-fonce mb-2">{{ 'DASHBOARD.SOLDE' | translate }}</h3>
                <p class="text-3xl font-bold text-accent-jaune">{{ data?.resume.solde | currency:'XOF':'symbol':'1.0-0' }}</p>
              </div>
              <div class="w-12 h-12 bg-accent-jaune/20 rounded-full flex items-center justify-center">
                💰
              </div>
            </div>
          </div>

          <div class="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow slide-up">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-montserrat font-bold text-bleu-fonce mb-2">{{ 'DASHBOARD.TOTAL_INVESTI' | translate }}</h3>
                <p class="text-3xl font-bold text-accent-jaune">{{ data?.resume.totalInvesti | currency:'XOF':'symbol':'1.0-0' }}</p>
              </div>
              <div class="w-12 h-12 bg-accent-jaune/20 rounded-full flex items-center justify-center">
                📈
              </div>
            </div>
          </div>

          <div class="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow slide-up">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-montserrat font-bold text-bleu-fonce mb-2">{{ 'DASHBOARD.RENDEMENT' | translate }}</h3>
                <p class="text-3xl font-bold text-accent-jaune">{{ data?.resume.rendementGlobal }}%</p>
              </div>
              <div class="w-12 h-12 bg-accent-jaune/20 rounded-full flex items-center justify-center">
                📊
              </div>
            </div>
          </div>

          <div class="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow slide-up">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-montserrat font-bold text-bleu-fonce mb-2">{{ 'DASHBOARD.DIVIDENDES_RECUS' | translate }}</h3>
                <p class="text-3xl font-bold text-accent-jaune">{{ data?.resume.dividendesRecus | currency:'XOF':'symbol':'1.0-0' }}</p>
              </div>
              <div class="w-12 h-12 bg-accent-jaune/20 rounded-full flex items-center justify-center">
                💎
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="repartition-section py-12 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce text-center mb-12 slide-up">
          {{ 'DASHBOARD.REPARTITION' | translate }}
        </h2>

        <div class="max-w-4xl mx-auto">
          <div class="space-y-6">
            <div *ngFor="let item of data?.repartition; let i = index" class="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg slide-up">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-montserrat font-bold text-bleu-fonce">{{ item.projet }}</h3>
                <span class="text-lg font-bold text-accent-jaune">{{ item.pourcentage }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  class="bg-accent-jaune h-4 rounded-full transition-all duration-1000 ease-out"
                  [style.width.%]="item.pourcentage"
                  [style.animation-delay.ms]="i * 200">
                </div>
              </div>
              <div class="flex justify-between text-sm text-gris-acier">
                <span>{{ item.montant | currency:'XOF':'symbol':'1.0-0' }}</span>
                <span>Rendement: {{ item.rendement }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="historique-section py-12 bg-gray-50/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce text-center mb-12 slide-up">
          {{ 'DASHBOARD.HISTORIQUE' | translate }}
        </h2>

        <div class="bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden slide-up">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-bleu-fonce text-white">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-medium">{{ 'DASHBOARD.DATE' | translate }}</th>
                  <th class="px-6 py-4 text-left text-sm font-medium">{{ 'DASHBOARD.TYPE' | translate }}</th>
                  <th class="px-6 py-4 text-left text-sm font-medium">{{ 'DASHBOARD.MONTANT' | translate }}</th>
                  <th class="px-6 py-4 text-left text-sm font-medium">{{ 'DASHBOARD.STATUT' | translate }}</th>
                  <th class="px-6 py-4 text-left text-sm font-medium">{{ 'DASHBOARD.DESCRIPTION' | translate }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr *ngFor="let transaction of data?.historique; let i = index" class="hover:bg-gray-50 slide-up">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ transaction.date | date:'dd/MM/yyyy' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ transaction.type }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ transaction.montant | currency:'XOF':'symbol':'1.0-0' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      [ngClass]="transaction.statut === 'Confirmé' || transaction.statut === 'Payé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                      class="px-3 py-1 text-xs font-medium rounded-full">
                      {{ transaction.statut }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {{ transaction.description }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="projets-section py-12 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce text-center mb-12 slide-up">
          {{ 'DASHBOARD.PROJETS_INVESTIS' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let projet of data?.projetsInvestis; let i = index" class="bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow slide-up">
            <div class="relative">
              <img [src]="projet.image" [alt]="projet.titre" class="w-full h-48 object-cover">
              <div class="absolute top-4 right-4">
                <span [ngClass]="projet.statut === 'Terminé' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                      class="px-3 py-1 rounded-full text-sm font-medium">
                  {{ projet.statut }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-montserrat font-bold text-bleu-fonce mb-3">{{ projet.titre }}</h3>
              <p class="text-gris-acier mb-4">{{ projet.description }}</p>

              <div class="space-y-3 mb-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>{{ 'DASHBOARD.PROGRESSION' | translate }}</span>
                    <span>{{ projet.progression }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-accent-jaune h-2 rounded-full transition-all duration-1000 ease-out"
                         [style.width.%]="projet.progression"
                         [style.animation-delay.ms]="i * 300">
                    </div>
                  </div>
                </div>

                <div class="flex justify-between text-sm">
                  <span class="text-gris-acier">{{ 'DASHBOARD.RENDEMENT_REALISE' | translate }}:</span>
                  <span class="font-medium text-accent-jaune">{{ projet.rendementRealise }}%</span>
                </div>

                <div class="flex justify-between text-sm">
                  <span class="text-gris-acier">{{ 'DASHBOARD.MONTANT' | translate }}:</span>
                  <span class="font-medium">{{ projet.montantInvesti | currency:'XOF':'symbol':'1.0-0' }}</span>
                </div>
              </div>

              <button class="w-full bg-accent-jaune text-bleu-fonce py-2 px-4 rounded-lg font-medium hover:bg-accent-orange transition-colors">
                {{ 'DASHBOARD.VOIR_DETAILS' | translate }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .dashboard-header {
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
    }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  data: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.data = this.contentService.getDashboardData();
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    // Animation du header
    gsap.from('.fade-in', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Animation des statistiques
    gsap.from('.slide-up', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Animation des barres de progression
    gsap.from('.bg-accent-jaune', {
      scrollTrigger: {
        trigger: '.repartition-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      width: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: 'power2.out'
    });
  }
}