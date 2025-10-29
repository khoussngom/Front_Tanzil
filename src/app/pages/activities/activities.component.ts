import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../../services/content.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero-activities py-20 bg-gradient-to-r from-accent-jaune to-accent-orange text-bleu-fonce">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-montserrat font-bold mb-6">
          {{ 'ACTIVITIES.TITRE' | translate }}
        </h1>
        <p class="text-xl max-w-2xl mx-auto">
          {{ 'ACTIVITIES.SOUS_TITRE' | translate }}
        </p>
      </div>
    </section>

    <section class="activites-section py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let activite of activites; let i = index" class="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg text-center slide-up hover-card">
            <div class="w-20 h-20 bg-accent-jaune rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              {{ activite.icone }}
            </div>
            <h3 class="text-2xl font-montserrat font-bold text-bleu-fonce mb-4">{{ 'ACTIVITIES.' + activite.titre.replace(' ', '_').toUpperCase() + '_TITRE' | translate }}</h3>
            <p class="text-gris-acier mb-6">{{ 'ACTIVITIES.' + activite.titre.replace(' ', '_').toUpperCase() + '_DESC' | translate }}</p>
            <button class="bg-accent-jaune text-bleu-fonce px-6 py-2 rounded-full font-bold hover:bg-accent-orange transition-colors">
              {{ 'ACTIVITIES.DECOUVRIR' | translate }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ActivitiesComponent implements OnInit, AfterViewInit {
  activites: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.activites = this.contentService.getActivitiesData();
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
        delay: index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    gsap.utils.toArray('.hover-card').forEach((element: any) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      element.addEventListener('mouseleave', () => {
        gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }
}