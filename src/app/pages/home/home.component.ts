import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCTAComponent } from '../../components/button-cta/button-cta.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../../services/content.service';
import { Router } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonCTAComponent],
  template: `
      <section class="hero-section relative mt-20 flex items-center justify-center overflow-hidden py-16 ">
    <!-- Overlay blanc clair semi-transparent -->
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm   "></div>

    <!-- Vidéo fixée en arrière-plan (déjà présente dans votre page) -->
    <video
      class="object-cover w-full h-full"
      muted
      autoplay
      loop
      playsinline
      preload="auto"
      style="position:fixed; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:-1; pointer-events:none;"
    >
      <source src="assets/media/video.mp4" type="video/mp4">
    </video>

    <div class="relative z-10 container mx-auto px-8 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Contenu gauche -->
        <div class="text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 fade-in text-[#003366]">
            {{ 'HOME.HERO_TITRE' | translate }}
          </h1>
          <h3 class="text-xl md:text-2xl font-semibold mb-6 text-[#003366] fade-in">
            {{ 'HOME.HERO_SOUS_TITRE' | translate }}
          </h3>

          <p class="text-base md:text-lg mb-8 max-w-xl fade-in text-gray-800 leading-relaxed">
            {{ 'HOME.HERO_DESC' | translate }}
          </p>

          <app-button-cta
            [texte]="'HOME.HERO_CTA' | translate"
            variante="primaire"
            taille="grand"
            (click)="naviguerVersInvestissement()"
            class="mb-8"
          ></app-button-cta>

          <div class="mt-8">
            <p class="text-sm text-gray-700 mb-3 font-medium">
              {{ 'HOME.HERO_PARTNERS' | translate }}
            </p>
            <div class="flex items-center gap-4">
              <img *ngFor="let partenaire of partenaires | slice:0:5" 
                  [src]="partenaire.logo" 
                  [alt]="partenaire.nom" 
                  class="h-8 w-auto" 
                  loading="lazy">
            </div>
          </div>
        </div>

        
        <div class="hidden md:flex justify-end items-center">
          <div class="w-full max-w-lg ">
            <div class="relative rounded-3xl overflow-hidden  shadow-2xl">
              <img src="assets/images/photoSection1.svg"
                  alt="photo section"
                  class="w-full h-auto object-cover">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <section class="vision-section py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <!-- Texte à gauche -->
          <div class="pr-6">
            <h2 class="text-3xl md:text-4xl font-montserrat font-bold text-[#1f4b79] mb-6 slide-up">
              {{ 'HOME.VISION_TITRE' | translate }}
            </h2>
            <p class="text-base md:text-lg text-gray-700 leading-relaxed mb-8 slide-up">
              {{ 'HOME.VISION_DESCRIPTION' | translate }}
            </p>

            <div class="bg-gray-900 text-white rounded-xl p-6 max-w-xl shadow-lg">
              <ul class="space-y-4">
                <li class="flex items-center justify-between">
                  <span class="text-lg">{{ 'HOME.VISION_LIST_ITEM_1' | translate }}</span>
                  <span class="text-gray-300">↗</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-lg">{{ 'HOME.VISION_LIST_ITEM_2' | translate }}</span>
                  <span class="text-gray-300">↗</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-lg">{{ 'HOME.VISION_LIST_ITEM_3' | translate }}</span>
                  <span class="text-gray-300">↗</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="text-lg">{{ 'HOME.VISION_LIST_ITEM_4' | translate }}</span>
                  <span class="text-gray-300">↗</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Image à droite -->
          <div class="flex justify-center  md:justify-end">
            <div class="w-full bg-white/40 backdrop-blur-sm max-w-md ">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl ">
                <img src="assets/images/photoSection2.svg" alt="vision" class="w-full h-auto object-cover">
                <!-- option: mask/clip-path could be added later to match exact découpe -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section py-20 bg-bleu-fonce text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold mb-6 slide-up">
          {{ 'HOME.CTA_INVESTIR' | translate }}
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto slide-up">
          Rejoignez notre programme d'investissement participatif.
        </p>
        <app-button-cta
          [texte]="'HOME.CTA_INVESTIR' | translate"
          variante="secondaire"
          taille="grand"
          (click)="naviguerVersInvestissement()"
        ></app-button-cta>
      </div>
    </section>

    <section class="partenaires-section py-20  backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce mb-6 slide-up">
            {{ 'HOME.PARTENAIRES_TITRE' | translate }}
          </h2>
        </div>

        <div class="flex flex-wrap justify-center items-center gap-8">
          <div
            *ngFor="let partenaire of partenaires"
            class="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img [src]="partenaire.logo" [alt]="partenaire.nom" class="h-16 w-auto" width="150" height="50" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <button (click)="retourHaut()" class="fixed bottom-4 right-4 bg-accent-jaune text-bleu-fonce p-3 rounded-full shadow-lg hover:bg-accent-orange transition-colors z-50">
      ↑
    </button>
  `,
  styles: [`
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  homeData: any;
  visionItems: any[] = [];
  projetsRecents: any[] = [];
  partenaires: any[] = [];

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit() {
    this.homeData = this.contentService.getHomeData();
    this.visionItems = this.homeData.visionItems;
    this.projetsRecents = this.homeData.projetsRecents;

    // Génération d'images placeholder via picsum.photos (seed pour stabilité)
    this.partenaires = Array.from({ length: 5 }).map((_, i) => ({
      nom: `Partenaire ${i + 1}`,
      // taille 150x50 adaptée à la classe h-16 ; utilisez seed pour obtenir images cohérentes entre reloads
      logo: this.placeholderLogo(i + 1, 150, 50)
    }));
  }

  // Retourne une URL d'image placeholder basée sur un seed pour avoir des images cohérentes
  // Retourne une URL d'image placeholder basée sur un seed pour avoir des images cohérentes
    placeholderLogo(index: number, width = 150, height = 50) {
      // ajouter un paramètre de version pour éviter certains caches et garantir des images cohérentes
      return `https://picsum.photos/seed/partner-${index}/${width}/${height}?v=${index}`;
    }
  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    // Utiliser des batches et des timelines pour des transitions plus fluides et performantes
    gsap.defaults({ ease: 'power3.out' });

    // Batch pour les fade-in: apparaître par groupes avec léger stagger
    ScrollTrigger.batch('.fade-in', {
      onEnter: (batch) => {
        gsap.fromTo(batch, { opacity: 0, y: 30 }, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08
        });
      },
      start: 'top 85%'
    });

    // Batch pour les éléments slide-up (cards / titres) avec un petit décalage entre eux
    ScrollTrigger.batch('.slide-up', {
      onEnter: (batch) => {
        gsap.fromTo(batch, { opacity: 0, y: 60 }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12
        });
      },
      start: 'top 85%'
    });

    // Parallax léger et plus fluide
    gsap.utils.toArray('.parallax').forEach((element: any) => {
      gsap.to(element, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 0.6
        }
      });
    });

    // Découper le scroll en pourcentages et positionner la vidéo à chaque % (snap par pourcent)
    const video = document.querySelector('.hero-section video') as HTMLVideoElement;
    if (video) {
      // attendre les métadonnées pour connaître la durée
      video.addEventListener('loadedmetadata', () => {
        let lastPercent = -1;

        // Créer un ScrollTrigger qui suit la progression et met à jour la vidéo uniquement quand le pourcent change
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          // scrub true pour que ScrollTrigger calcule progress en continu, mais on n'utilise que l'entier %
          scrub: true,
          onUpdate: (self) => {
            const percent = Math.round(self.progress * 100);
            if (percent !== lastPercent) {
              lastPercent = percent;
              const targetTime = Math.min(video.duration, (percent / 100) * video.duration);

              // Mettre à jour la position de la vidéo. On utilise requestAnimationFrame pour être sûr d'être dans un frame.
              requestAnimationFrame(() => {
                try {
                  // Définir currentTime directement pour "snap" à chaque pourcent
                  video.currentTime = targetTime;
                } catch (e) {
                  // Certains navigateurs peuvent lancer si manipulé trop souvent ; on ignore les erreurs silencieusement
                  // (ou on pourrait fallback en faisant un petit gsap.to si nécessaire)
                }
              });
            }
          }
        });
      });
    }
  }

  defilerVersSections() {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: '.vision-section', offsetY: 80 },
      ease: 'power2.out'
    });
  }

  retourHaut() {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: 0 },
      ease: 'power2.out'
    });
  }

  naviguerVersInvestissement() {
    this.router.navigate(['/investissement']);
  }
}