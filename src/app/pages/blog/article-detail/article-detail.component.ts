import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../components/card/card.component';
import { ButtonCTAComponent } from '../../../components/button-cta/button-cta.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardComponent, ButtonCTAComponent],
  template: `
    <section class="hero-article py-20 bg-gradient-to-r from-bleu-fonce to-gris-acier text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-montserrat font-bold mb-6">
          {{ article?.titre }}
        </h1>
        <div class="flex justify-center items-center space-x-4 text-sm">
          <span>{{ 'ARTICLE_DETAIL.PAR' | translate }} {{ article?.auteur_nom }}</span>
          <span>•</span>
          <span>{{ article?.date_publication | date:'dd/MM/yyyy' }}</span>
        </div>
      </div>
    </section>

    <section class="article-content py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="mb-8">
            <img
              [src]="article?.image_couverture"
              [alt]="article?.titre"
              class="w-full h-64 object-cover rounded-lg"
            >
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gris-acier leading-relaxed mb-6">
              {{ article?.contenu }}
            </p>

            <p class="text-lg text-gris-acier leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p class="text-lg text-gris-acier leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-accent-jaune rounded-full flex items-center justify-center">
                  <span class="text-bleu-fonce font-bold">{{ article?.auteur_nom?.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-montserrat font-bold text-bleu-fonce">{{ article?.auteur_nom }}</p>
                  <p class="text-sm text-gris-acier">{{ 'ARTICLE_DETAIL.AUTEUR' | translate }}</p>
                </div>
              </div>

              <app-button-cta
                [texte]="'ARTICLE_DETAIL.RETOUR_BLOG' | translate"
                variante="secondaire"
                taille="moyen"
                (onClick)="retourAuBlog()"
              ></app-button-cta>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="articles-relies py-20 bg-gray-50/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce text-center mb-12">
          {{ 'ARTICLE_DETAIL.ARTICLES_RELIES' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <app-card
            *ngFor="let articleRelie of articlesRelies"
            [titre]="articleRelie.titre"
            [description]="articleRelie.contenu.substring(0, 100) + '...'"
            [imageUrl]="articleRelie.image_couverture"
            [boutonTexte]="'ARTICLE_DETAIL.LIRE_PLUS' | translate"
          ></app-card>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ArticleDetailComponent implements OnInit {
  article: any = null;
  articlesRelies: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // TODO: Charger les données de l'article depuis le backend
    this.chargerArticle(id);
    this.chargerArticlesRelies();
  }

  chargerArticle(id: string) {
    // Simulation des données pour le développement
    this.article = {
      id: id,
      titre: 'L&apos;innovation au service du développement durable',
      contenu: 'Le développement durable est au cœur de notre stratégie chez Tanzil Corporation. Nous nous engageons à créer des projets qui non seulement génèrent de la valeur économique, mais qui contribuent également à un avenir plus durable pour notre planète.',
      auteur_id: 1,
      auteur_nom: 'Jean Dupont',
      image_couverture: 'assets/images/blog/article-1.jpg',
      date_publication: new Date('2024-01-15')
    };
  }

  chargerArticlesRelies() {
    // Simulation des données pour le développement
    this.articlesRelies = [
      {
        id: '2',
        titre: 'Les défis de l&apos;immobilier moderne',
        contenu: 'L&apos;immobilier moderne fait face à de nombreux défis...',
        image_couverture: 'assets/images/blog/article-2.jpg'
      },
      {
        id: '3',
        titre: 'Investissement responsable',
        contenu: 'L&apos;investissement responsable devient une priorité...',
        image_couverture: 'assets/images/blog/article-3.jpg'
      }
    ];
  }

  retourAuBlog() {
    // TODO: Naviguer vers la page blog
    console.log('Retour au blog');
  }
}