import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Pokemon } from './models/pokemon.model';
import { NgFor } from '@angular/common';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokemon-card';
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    for (let index = 1; index < 11; index++) {
      this.fetchPokemonData(index);
    }
  }

  fetchPokemonData(id: number) {
    this.pokemonService.getPokemon(id).subscribe((data) => {
      console.log(data);

      this.pokemonList?.push(data)
    });
  }
}
