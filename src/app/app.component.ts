import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Pokemon } from './models/pokemon.model';
import { NgFor, NgIf } from '@angular/common';
import { PokemonService } from './services/pokemon.service';
import { PaginationComponent } from "./components/pagination/pagination.component";
import { console } from 'inspector';
import { LoadingComponent } from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, NgFor, PaginationComponent, LoadingComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokemon-card';
  pokemonList: Pokemon[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  maxPokemon: number = 151;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getAllPokemon(): void {
    this.pokemonService?.getAllPokemon().subscribe((data) => {
      this.totalItems = data?.length;
    });

    for (let index = (1 + (this.currentPage - 1) * 10); index < (11 + (this.currentPage - 1) * 10); index++) {
      if (index <= this.maxPokemon) {
        this.fetchPokemonData(index);
      }
    };
  }

  fetchPokemonData(id: number) {
    this.pokemonService.getPokemon(id).subscribe((data) => {
      this.pokemonList.push(data);
      this.pokemonList.sort((a, b) => a.id - b.id);
    });

  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pokemonList = [];
    this.getAllPokemon();
  }
}
