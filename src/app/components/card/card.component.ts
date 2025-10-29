import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div class="relative">
        <img *ngIf="imageUrl" [src]="imageUrl" [alt]="titre" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div class="absolute bottom-4 left-4 text-white">
          <h3 class="font-montserrat font-bold text-lg">{{ titre }}</h3>
          <p class="text-sm opacity-90">{{ sousTitre }}</p>
        </div>
      </div>
      <div class="p-6">
        <p class="text-gris-acier mb-4">{{ description }}</p>
        <button class="bg-accent-jaune text-bleu-fonce px-4 py-2 rounded hover:bg-accent-orange transition-colors">
          {{ boutonTexte || 'En savoir plus' }}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() titre: string = '';
  @Input() sousTitre: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() boutonTexte: string = '';
}