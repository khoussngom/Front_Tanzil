import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  template: `
    <header class="fixed top-0 left-0 w-full shadow-lg backdrop-blur-md border-b border-opacity-20" 
            [ngClass]="isContactPage ? 'border-blue-900' : 'border-white'" 
            style="z-index: 9999;"
            [style.background]="isContactPage ? 'rgba(30, 58, 138, 0.1)' : 'rgba(255, 255, 255, 0.1)'">
      <nav class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <!-- Logo Section -->
          <div class="flex items-center space-x-3">
            <img src="assets/images/iconeLogoTanzil.png" alt="Tanzil Corporation" class="h-12 w-12">
          </div>

          <!-- Navigation Links - Desktop -->
                    <div class="hidden lg:flex space-x-6">
            <a routerLink="/accueil" 
               routerLinkActive="active-link" 
               [routerLinkActiveOptions]="{exact: true}"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link">
              {{ 'NAVIGATION.ACCUEIL' | translate }}
            </a>
            <a routerLink="/a-propos" 
               routerLinkActive="active-link"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link">
              {{ 'NAVIGATION.A_PROPOS' | translate }}
            </a>
            <!-- <a routerLink="/projets" 
               routerLinkActive="active-link"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link">
              {{ 'NAVIGATION.PROJETS' | translate }}
            </a>
            <a routerLink="/blog" 
               routerLinkActive="active-link"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link">
              {{ 'NAVIGATION.BLOG' | translate }}
            </a> -->
            <a routerLink="/contact" 
               routerLinkActive="active-link"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link">
              {{ 'NAVIGATION.CONTACT' | translate }}
            </a>
            <!-- <a routerLink="/investissement" 
               routerLinkActive="active-link"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link">
              {{ 'NAVIGATION.INVESTISSEMENT' | translate }}
            </a> -->
          </div>

          <!-- Right Side: Search & User -->
          <div class="flex items-center space-x-4">
            <!-- Search Icon -->
            <button [ngClass]="isContactPage ? 'text-blue-900 hover:text-blue-700' : 'text-white hover:text-gray-200'" 
                    class="transition-colors p-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- User Icon -->
            <button [ngClass]="isContactPage ? 'text-blue-900 hover:text-blue-700' : 'text-white hover:text-gray-200'" 
                    class="transition-colors p-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </button>

            <!-- Mobile Menu Button -->
            <button 
              (click)="toggleMobileMenu()" 
              [ngClass]="isContactPage ? 'text-blue-900 hover:text-blue-700' : 'text-white hover:text-gray-200'"
              class="lg:hidden focus:outline-none p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path *ngIf="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path *ngIf="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="mobileMenuOpen" class="lg:hidden mt-4 pb-4 border-t border-white border-opacity-20 pt-4">
          <div class="flex flex-col space-y-2">
            <a routerLink="/accueil" 
               (click)="toggleMobileMenu()"
               routerLinkActive="active-link-mobile" 
               [routerLinkActiveOptions]="{exact: true}"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link-mobile">
              {{ 'NAVIGATION.ACCUEIL' | translate }}
            </a>
            <a routerLink="/a-propos" 
               (click)="toggleMobileMenu()"
               routerLinkActive="active-link-mobile"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link-mobile">
              {{ 'NAVIGATION.A_PROPOS' | translate }}
            </a>
            <a routerLink="/projets" 
               (click)="toggleMobileMenu()"
               routerLinkActive="active-link-mobile"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link-mobile">
              {{ 'NAVIGATION.PROJETS' | translate }}
            </a>
            <a routerLink="/investissement" 
               (click)="toggleMobileMenu()"
               routerLinkActive="active-link-mobile"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link-mobile">
              {{ 'NAVIGATION.INVESTISSEMENT' | translate }}
            </a>
            <a routerLink="/contact" 
               (click)="toggleMobileMenu()"
               routerLinkActive="active-link-mobile"
               [ngClass]="isContactPage ? 'text-blue-900 hover:bg-blue-100' : 'text-white hover:bg-white/20'"
               class="nav-link-mobile">
              {{ 'NAVIGATION.CONTACT' | translate }}
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .nav-link {
      padding: 0.5rem 1rem;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 400;
      transition: all 0.2s ease;
      border-radius: 0.25rem;
    }

    .active-link {
      color: #ffffff;
      text-decoration: underline;
      text-underline-offset: 4px;
      text-decoration-thickness: 2px;
      font-weight: 500;
    }

    .nav-link-mobile {
      padding: 0.75rem 1rem;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      border-radius: 0.375rem;
    }

    .active-link-mobile {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 500;
    }
  `]
})
export class HeaderComponent implements OnInit {
  langueCourante: string = 'fr';
  mobileMenuOpen: boolean = false;
  isContactPage: boolean = false;

  constructor(private translate: TranslateService, private router: Router) {
    this.langueCourante = this.translate.currentLang || 'fr';
  }

  ngOnInit() {
    // Détecter la route actuelle lors du chargement initial
    this.isContactPage = this.router.url.includes('/contact') || this.router.url.includes('/a-propos');

    // Écouter les changements de route
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isContactPage = event.url.includes('/contact') || event.url.includes('/a-propos');
    });
  }

  changerLangue(langue: string) {
    this.translate.use(langue);
    this.langueCourante = langue;
    localStorage.setItem('langue', langue);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}