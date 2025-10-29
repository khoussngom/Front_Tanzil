import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-cta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="classes"
      (click)="onClick.emit()"
      [disabled]="disabled"
    >
      {{ texte }}
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonCTAComponent {
  @Input() texte: string = 'Action';
  @Input() variante: 'primaire' | 'secondaire' | 'accent' = 'primaire';
  @Input() taille: 'petit' | 'moyen' | 'grand' = 'moyen';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  get classes(): string {
    let baseClasses = 'font-montserrat font-bold rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

    switch (this.variante) {
      case 'primaire':
        baseClasses += ' bg-accent-jaune text-white hover:bg-accent-orange focus:ring-accent-jaune';
        break;
      case 'secondaire':
        baseClasses += ' bg-gris-acier text-white hover:bg-gray-400 focus:ring-gris-acier';
        break;
      case 'accent':
        baseClasses += ' bg-accent-orange text-white hover:bg-red-600 focus:ring-accent-orange';
        break;
    }

    switch (this.taille) {
      case 'petit':
        baseClasses += ' px-3 py-1 text-sm';
        break;
      case 'moyen':
        baseClasses += ' px-4 py-2 text-base';
        break;
      case 'grand':
        baseClasses += ' px-6 py-3 text-lg';
        break;
    }

    if (this.disabled) {
      baseClasses += ' opacity-50 cursor-not-allowed';
    }

    return baseClasses;
  }
}