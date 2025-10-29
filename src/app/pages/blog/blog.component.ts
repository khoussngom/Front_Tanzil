import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../services/content.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <section class="hero-blog py-20 bg-gradient-to-r from-gris-acier to-bleu-fonce text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-montserrat font-bold mb-6 fade-in">
          {{ 'BLOG.TITRE' | translate }}
        </h1>
        <p class="text-xl max-w-2xl mx-auto fade-in">
          {{ 'BLOG.SOUS_TITRE' | translate }}
        </p>
      </div>
    </section>

    <section class="articles-section py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce text-center mb-16 slide-up">
          {{ 'BLOG.ARTICLES_RECENTS' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article *ngFor="let article of articles; let i = index" class="bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 slide-up">
            <div class="relative">
              <img [src]="article.image" [alt]="article.titre" class="w-full h-48 object-cover">
              <div class="absolute top-4 left-4">
                <span class="bg-accent-jaune text-bleu-fonce px-3 py-1 rounded-full text-sm font-medium">
                  {{ article.categorie }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center text-sm text-gris-acier mb-3">
                <span>{{ 'BLOG.PAR' | translate }} {{ article.auteur }}</span>
                <span class="mx-2">•</span>
                <span>{{ 'BLOG.LE' | translate }} {{ article.date | date:'dd/MM/yyyy' }}</span>
                <span class="mx-2">•</span>
                <span>{{ article.tempsLecture }} {{ 'BLOG.TEMPS_LECTURE' | translate }}</span>
              </div>

              <h3 class="text-xl font-montserrat font-bold text-bleu-fonce mb-3 line-clamp-2">
                {{ article.titre }}
              </h3>

              <p class="text-gris-acier mb-4 line-clamp-3">
                {{ article.resume }}
              </p>

              <div class="flex items-center justify-between">
                <a [routerLink]="['/blog', article.id || i+1]" class="text-accent-jaune font-medium hover:text-accent-orange transition-colors">
                  {{ 'BLOG.LIRE_PLUS' | translate }}
                </a>
                <button class="text-gris-acier hover:text-bleu-fonce transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BlogComponent implements OnInit, AfterViewInit {
  articles: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.chargerArticles();
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  chargerArticles() {
    // Utiliser le ContentService pour les données statiques
    this.articles = this.contentService.getBlogData();
  }

  initialiserAnimations() {
    // Animation du hero
    gsap.from('.fade-in', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Animation des articles avec stagger
    gsap.from('.slide-up', {
      scrollTrigger: {
        trigger: '.articles-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }
}