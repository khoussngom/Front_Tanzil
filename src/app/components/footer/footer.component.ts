import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  template: `
    <footer class=" text-white py-8 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-montserrat font-bold text-lg mb-4">Tanzil Corporation</h3>
            <p class="text-sm">{{ 'FOOTER.DESCRIPTION' | translate }}</p>
          </div>

          <div>
            <h4 class="font-montserrat font-bold mb-4">{{ 'FOOTER.LIENS_RAPIDES' | translate }}</h4>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/a-propos" class="hover:text-accent-jaune transition-colors">{{ 'NAVIGATION.A_PROPOS' | translate }}</a></li>
              <li><a routerLink="/activites" class="hover:text-accent-jaune transition-colors">{{ 'NAVIGATION.ACTIVITES' | translate }}</a></li>
              <li><a routerLink="/projets" class="hover:text-accent-jaune transition-colors">{{ 'NAVIGATION.PROJETS' | translate }}</a></li>
              <li><a routerLink="/contact" class="hover:text-accent-jaune transition-colors">{{ 'NAVIGATION.CONTACT' | translate }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-montserrat font-bold mb-4">{{ 'FOOTER.CONTACT' | translate }}</h4>
            <div class="space-y-2 text-sm">
              <p>{{ 'FOOTER.EMAIL' | translate }}: contact&#64;tanzil.com</p>
              <p>{{ 'FOOTER.TELEPHONE' | translate }}: +221 XX XX XX XX</p>
              <p>{{ 'FOOTER.ADRESSE' | translate }}: bourguiba, Sénègal</p>
            </div>
          </div>

          <div>
            <h4 class="font-montserrat font-bold mb-4">{{ 'FOOTER.NEWSLETTER' | translate }}</h4>
            <div class="flex">
              <input type="email" placeholder="{{ 'FOOTER.EMAIL_PLACEHOLDER' | translate }}" class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l">
              <button class="bg-accent-jaune text-bleu-fonce px-4 py-2 rounded-r hover:bg-accent-orange transition-colors">
                {{ 'FOOTER.S_ABONNER' | translate }}
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-400 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2025 Tanzil Corporation. {{ 'FOOTER.TOUS_DROITS_RESERVES' | translate }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}