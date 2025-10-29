import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../../services/content.service';

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero-about py-20 bg-gradient-to-r from-bleu-fonce to-gris-acier text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-montserrat font-bold mb-6 fade-in">
          {{ 'ABOUT.TITRE' | translate }}
        </h1>
        <p class="text-xl max-w-2xl mx-auto fade-in">
          {{ 'ABOUT.SOUS_TITRE' | translate }}
        </p>
      </div>
    </section>

    <section class="timeline-section py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce text-center mb-16 slide-up">
          {{ 'ABOUT.TIMELINE_TITRE' | translate }}
        </h2>

        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent-jaune"></div>

          <div class="space-y-12">
            <div *ngFor="let event of timeline; let i = index" class="relative flex items-center">
              <div class="w-1/2 pr-8 text-right" [ngClass]="i % 2 === 0 ? '' : 'order-2 pl-8 text-left'">
                <div class="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg slide-up">
                  <h3 class="text-2xl font-montserrat font-bold text-bleu-fonce mb-2">{{ event.annee }}</h3>
                  <h4 class="text-xl font-bold text-accent-jaune mb-4">{{ 'ABOUT.TIMELINE_' + event.annee | translate }}</h4>
                  <p class="text-gris-acier">{{ event.description }}</p>
                </div>
              </div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-jaune rounded-full border-4 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="equipe-section py-20 bg-gray-50/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce text-center mb-16 slide-up">
          {{ 'ABOUT.EQUIPE_TITRE' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let membre of equipe; let i = index" class="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg text-center slide-up">
            <div class="w-24 h-24 bg-accent-jaune rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              👤
            </div>
            <h3 class="text-xl font-montserrat font-bold text-bleu-fonce mb-2">{{ 'ABOUT.' + membre.poste.replace(' ', '_').toUpperCase() | translate }}</h3>
            <h4 class="text-lg font-bold text-accent-jaune mb-4">{{ membre.poste }}</h4>
            <p class="text-gris-acier">{{ 'ABOUT.' + membre.poste.replace(' ', '_').toUpperCase() + '_DESC' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="valeurs-section py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-montserrat font-bold text-bleu-fonce text-center mb-16 slide-up">
          {{ 'ABOUT.VALEURS_TITRE' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div *ngFor="let valeur of valeurs; let i = index" class="text-center slide-up">
            <div class="w-20 h-20 bg-accent-jaune rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              {{ i === 0 ? '💡' : i === 1 ? '🔒' : '🤝' }}
            </div>
            <h3 class="text-xl font-montserrat font-bold text-bleu-fonce mb-4">{{ 'ABOUT.VALEUR_' + (i+1) | translate }}</h3>
            <p class="text-gris-acier">{{ valeur }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent implements OnInit, AfterViewInit {
  aboutData: any;
  timeline: any[] = [];
  equipe: any[] = [];
  valeurs: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.aboutData = this.contentService.getAboutData();
    this.timeline = this.aboutData.timeline;
    this.equipe = this.aboutData.equipe;
    this.valeurs = this.aboutData.valeurs;
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    gsap.utils.toArray('.fade-in').forEach((element: any) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.slide-up').forEach((element: any, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }
}