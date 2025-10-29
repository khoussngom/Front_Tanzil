import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  template: `
    <header class="text-blanc fixed top-0 left-0 w-full  shadow-lg backdrop-blur-md" styles="z-index: 9999;">
      <nav class="container mx-auto px-4 py-4 ">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <img src="assets/images/iconeLogoTanzil.png" alt="Tanzil Corporation" class="h-14 w-14 w-auto">
            <h1 class="text-xl font-montserrat font-bold">Tanzil Corporation</h1>
          </div>

          <div class="hidden md:flex space-x-6">
            <a routerLink="/accueil" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.ACCUEIL' | translate }}
            </a>
            <a routerLink="/a-propos" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.A_PROPOS' | translate }}
            </a>
            <a routerLink="/activites" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.ACTIVITES' | translate }}
            </a>
            <a routerLink="/projets" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.PROJETS' | translate }}
            </a>
            <a routerLink="/investissement" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.INVESTISSEMENT' | translate }}
            </a>
            <a routerLink="/blog" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.BLOG' | translate }}
            </a>
            <a routerLink="/contact" routerLinkActive="text-accent-jaune bg-white p-3 py-1 rounded-xl" class="hover:text-accent-jaune bg-white p-3 py-1 rounded-xl transition-colors">
              {{ 'NAVIGATION.CONTACT' | translate }}
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <button
              (click)="changerLangue('fr')"
              [ngClass]="langueCourante === 'fr' ? 'text-sm bg-white p-3 py-1 rounded-xl text-accent-jaune transition-colors' : 'text-sm hover:text-accent-jaune transition-colors'">
              FR
            </button>
            <button
              (click)="changerLangue('en')"
              [ngClass]="langueCourante === 'en' ? 'text-sm bg-white p-3 py-1 rounded-xl text-accent-jaune transition-colors' : 'text-sm hover:text-accent-jaune transition-colors'">
              EN
            </button>
            <button class="bg-white text-accent-jaune px-4 py-2 rounded hover:bg-accent-orange  hover:text-white transition-colors">
              {{ 'NAVIGATION.CONNEXION' | translate }}
            </button>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: rgba(0, 0, 0, 0.3);
    }
  `]
})
export class HeaderComponent {
  langueCourante: string = 'fr';

  constructor(private translate: TranslateService) {
    this.langueCourante = this.translate.currentLang || 'fr';
  }

  changerLangue(langue: string) {
    this.translate.use(langue);
    this.langueCourante = langue;
    localStorage.setItem('langue', langue);
  }
}