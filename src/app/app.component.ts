import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { Pokemon } from './models/pokemon.model';
import { NgFor, NgIf } from '@angular/common';
import { PokemonService } from './services/pokemon.service';
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalService } from './services/modal.service';
import { forkJoin } from 'rxjs';
import { LoadingComponent } from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, NgFor, PaginationComponent, ModalComponent, LoadingComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokemon-card';
  pokemonList: Pokemon[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  maxPokemon: number = 151;

  isWaitingForResponse: boolean = false;

  constructor(private pokemonService: PokemonService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getAllPokemon(): void {
    this.pokemonService?.getAllPokemon().subscribe((data) => {
      this.totalItems = data?.length;
    });
  
    const start = 1 + (this.currentPage - 1) * 10;
    const end = Math.min(start + 9, this.maxPokemon);
  
    const requests = [];
    for (let id = start; id <= end; id++) {
      requests.push(this.pokemonService.getPokemon(id));
    }
  
    this.isWaitingForResponse = true;

    forkJoin(requests).subscribe((pokemonArray) => {
      this.pokemonList = pokemonArray.sort((a, b) => a.id - b.id);
      this.isWaitingForResponse = false;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pokemonList = [];
    this.getAllPokemon();
  }
}
