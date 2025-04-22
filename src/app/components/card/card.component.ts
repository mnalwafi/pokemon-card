import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './card.component.html',
})

export class CardComponent {
  @Input() pokemon!: Pokemon;

  typeColors: { [key: string]: string } = {
    normal: '#D5D5A7',
    fire: '#FF9C4A',
    water: '#8FB6FF',
    electric: '#FFEB66',
    grass: '#A8E87D',
    ice: '#CFF4F2',
    fighting: '#E35A50',
    poison: '#CC63C6',
    ground: '#F3D68C',
    flying: '#C5B4F9',
    psychic: '#FF82A8',
    bug: '#C4D44D',
    rock: '#D8C75D',
    ghost: '#A288C0',
    dragon: '#9B6CFF',
    dark: '#A39083',
    steel: '#D1D1E6',
    fairy: '#F4AFCB'
  };

  getBackgroundClass(): string {
    const type = this.pokemon.type?.[0];
    const hex = this.typeColors[type];
    return `bg-[${hex}]`;
  }
}

type TypeColorMap = { [key: string]: string };