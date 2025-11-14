import { Component, OnInit, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  annee: string;
  titre: string;
  description: string;
}

interface Project {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `

    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <!-- Contenu texte -->
          <div class="slide-up order-2 lg:order-1">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {{ 'ABOUT.TITRE' | translate }}
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed text-base md:text-lg">
              {{ 'ABOUT.DESCRIPTION_1' | translate }}
            </p>
            <p class="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
              {{ 'ABOUT.DESCRIPTION_2' | translate }}
            </p>
            <button routerLink="/contact" class="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all font-semibold shadow-md hover:shadow-lg">
              {{ 'ABOUT.CTA_BUTTON' | translate }}
            </button>
          </div>

          <!-- Image du bâtiment -->
          <div class="slide-up order-1 lg:order-2">
            <div class="relative">
              <div class="bg-gradient-to-br from-blue-100 to-blue-50  rounded-2xl p-4 md:p-8 lg:h-[600px]">
                <img 
                  [src]="mainBuilding" 
                  alt="Immeuble Tanzil Corporation" 
                  class="rounded-xl shadow-2xl w-full h-auto object-contain lg:h-[550px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Mission Statement avec carousel -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto text-center mb-12 slide-up">
          <p class="text-2xl md:text-3xl font-bold text-blue-900 leading-relaxed">
            {{ 'ABOUT.MISSION_TITLE' | translate }}
          </p>
        </div>

        <!-- Carousel de projets -->
        <div class="relative max-w-6xl mx-auto slide-up">
          <div class="flex items-center justify-center gap-4 md:gap-8">
            <!-- Bouton précédent -->
            <button 
              (click)="previousSlide()"
              class="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-200 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all shadow-md z-10 flex-shrink-0">
              <span class="text-xl md:text-2xl text-blue-900">‹</span>
            </button>

            <!-- Container des images -->
            <div class="overflow-hidden flex-1">
              <div class="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
                   [style.transform]="'translateX(-' + (currentSlide * (100 / visibleSlides)) + '%)'">
                <div *ngFor="let project of projects; let i = index" 
                      class="flex-shrink-0"
                      [style.width.%]="100 / visibleSlides">
                  <div class="bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow carousel-card">
                    <img 
                      [src]="project.image" 
                      [alt]="project.alt"
                      class="w-full h-48 md:h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Bouton suivant -->
            <button 
              (click)="nextSlide()"
              class="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-200 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all shadow-md z-10 flex-shrink-0">
              <span class="text-xl md:text-2xl text-blue-900">›</span>
            </button>
          </div>

          <!-- Indicateurs -->
          <div class="flex justify-center items-center gap-3 mt-6">
      <button *ngFor="let project of projects; let i = index"
        (click)="goToSlide(i)"
        [ngClass]="{ 'w-8 h-2 rounded-full bg-blue-900': i === currentSlide, 'w-2 h-2 rounded-full bg-gray-300': i !== currentSlide }"
        class="transition-all overflow-hidden"
        [attr.aria-label]="'Aller au slide ' + (i + 1)">
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Timeline -->
    <!-- <section class="timeline-section py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12 md:mb-16 slide-up">
          {{ 'ABOUT.TIMELINE_TITRE' | translate }}
        </h2>

        <div class="relative max-w-6xl mx-auto">
  
          <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-400 timeline-line"></div>

          <div class="space-y-8 md:space-y-12">
            <div *ngFor="let event of timeline; let i = index" 
                 class="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
              
          
              <div class="w-full md:w-1/2" 
                   [ngClass]="i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'">
                <div class="bg-white border-2 border-gray-100 p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all slide-up">
                  <div class="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-base md:text-lg mb-4">
                    {{ event.annee }}
                  </div>
                  <h3 class="text-xl md:text-2xl font-bold text-blue-900 mb-3">{{ event.titre }}</h3>
                  <p class="text-gray-600 leading-relaxed text-sm md:text-base">{{ event.description }}</p>
                </div>
              </div>

              
              <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full border-4 border-white shadow-lg z-10"></div>
              
            
              <div class="hidden md:block w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Section Contact -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-16 text-center slide-up">
            {{ 'ABOUT.CONTACT_TITRE' | translate }}
          </h2>

          <div class="max-w-4xl mx-auto">
            <!-- Informations de contact -->
            <div class="space-y-6 slide-up">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class='bx bx-map text-white text-xl'></i>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">{{ 'ABOUT.CONTACT_ADRESSE' | translate }}</h3>
                  <p class="text-gray-600">Immeuble A, FOFANA 2400, Avenue Bourguiba</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class='bx bx-phone text-white text-xl'></i>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">{{ 'ABOUT.CONTACT_TELEPHONE' | translate }}</h3>
                  <p class="text-gray-600">+221 77 874 30 24</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class='bx bx-envelope text-white text-xl'></i>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">{{ 'ABOUT.CONTACT_EMAIL' | translate }}</h3>
                  <p class="text-gray-600">ms&#64;tanzilgroupe.com</p>
                </div>
              </div>

              <div class="bg-blue-50 rounded-xl p-6 mt-8">
                <h3 class="font-bold text-blue-900 mb-3">{{ 'ABOUT.HORAIRES_TITRE' | translate }}</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">{{ 'ABOUT.HORAIRES_LUNDI_VENDREDI' | translate }}</span>
                    <span class="font-semibold text-gray-900">8h00 - 18h00</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">{{ 'ABOUT.HORAIRES_SAMEDI' | translate }}</span>
                    <span class="font-semibold text-gray-900">9h00 - 14h00</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">{{ 'ABOUT.HORAIRES_DIMANCHE' | translate }}</span>
                    <span class="font-semibold text-gray-900">{{ 'ABOUT.HORAIRES_FERME' | translate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-6 text-center text-sm">
      <p>© Copyright 2025 Tanzil Corporation. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Ne pas cacher le contenu par défaut : permet de rester visible si GSAP/ScrollTrigger
       ne s'exécute pas immédiatement. Les animations GSAP continueront de fonctionner
       mais ne masqueront plus statiquement le contenu. */
    .slide-up {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 350ms ease, transform 350ms ease;
    }

    .timeline-line {
      height: 0;
    }

    /* Carousel card styling */
    .carousel-card {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 220px;
      background-clip: padding-box;
    }

    .carousel-card img {
      max-width: 100%;
      border-radius: 0.5rem;
      object-fit: cover;
      display: block;
    }

    /* Indicator transitions */
    .indicator {
      transition: all 220ms ease;
    }

    input:focus, textarea:focus {
      box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    }

    @media (max-width: 768px) {
      .timeline-line {
        display: none;
      }
    }
  `]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  mainBuilding = 'assets/images/image1about.png';
  
  timeline: TimelineEvent[] = [];
  projects: Project[] = [];
  currentSlide = 0;
  visibleSlides = 3;
  // Handler stocké pour pouvoir l'enlever proprement à la destruction
  private resizeHandler = () => this.updateVisibleSlides();


  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadContent();
    this.updateVisibleSlides();
    
    // Écouter les changements de taille d'écran
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialiserAnimations();
    }, 100);
  }

  private updateVisibleSlides() {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w < 768) {
        // mobile
        this.visibleSlides = 1;
      } else if (w >= 768 && w < 1024) {
        // tablette / small desktop
        this.visibleSlides = 2;
      } else {
        // grand écran
        this.visibleSlides = 3;
      }
      // s'assurer que currentSlide reste dans les bornes
      const maxSlide = Math.max(0, this.projects.length - this.visibleSlides);
      if (this.currentSlide > maxSlide) {
        this.currentSlide = maxSlide;
      }
    }
  }

  private loadContent() {
    // Timeline
    this.timeline = [
      {
        annee: '2009',
        titre: this.translate.instant('ABOUT.TIMELINE_2009.TITRE'),
        description: this.translate.instant('ABOUT.TIMELINE_2009.DESCRIPTION')
      },
      {
        annee: '2012',
        titre: this.translate.instant('ABOUT.TIMELINE_2012.TITRE'),
        description: this.translate.instant('ABOUT.TIMELINE_2012.DESCRIPTION')
      },
      {
        annee: '2015',
        titre: this.translate.instant('ABOUT.TIMELINE_2015.TITRE'),
        description: this.translate.instant('ABOUT.TIMELINE_2015.DESCRIPTION')
      },
      {
        annee: '2018',
        titre: this.translate.instant('ABOUT.TIMELINE_2018.TITRE'),
        description: this.translate.instant('ABOUT.TIMELINE_2018.DESCRIPTION')
      },
      {
        annee: '2020',
        titre: this.translate.instant('ABOUT.TIMELINE_2020.TITRE'),
        description: this.translate.instant('ABOUT.TIMELINE_2020.DESCRIPTION')
      },
      {
        annee: '2025',
        titre: this.translate.instant('ABOUT.TIMELINE_2025.TITRE'),
        description: this.translate.instant('ABOUT.TIMELINE_2025.DESCRIPTION')
      }
    ];

    // Projets pour le carousel
    this.projects = [
      { image: 'assets/images/aboutCard.svg', alt: 'Projet résidentiel 1' },
      { image: 'assets/images/aboutCard1.svg', alt: 'Projet commercial' },
      { image: 'assets/images/aboutCard2.svg', alt: 'Projet résidentiel 2' }
    ];
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = Math.max(0, this.projects.length - this.visibleSlides);
    }
  }

  nextSlide() {
    const maxSlide = Math.max(0, this.projects.length - this.visibleSlides);
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  goToSlide(index: number) {
    const maxSlide = Math.max(0, this.projects.length - this.visibleSlides);
    this.currentSlide = Math.min(index, maxSlide);
  }


  private initialiserAnimations() {
    // Animations au scroll
    gsap.utils.toArray('.slide-up').forEach((element: any) => {
      gsap.from(element, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animation de la ligne de timeline
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
      gsap.to(timelineLine, {
        height: '100%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }
}