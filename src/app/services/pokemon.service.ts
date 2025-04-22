import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { console } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`).pipe(map(data => this.transformPokemonData(data)));
  }

  getAllPokemon(limit: number = 151): Observable<any> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}`).pipe(map(response => response.results));
  }

  private transformPokemonData(data: any): Pokemon {
    // console.log(data);
    return {
      id: data.id,
      name: data.name,
      img: data.sprites.front_default, // image URL
      type: data.types.map((type: any) => type.type.name), // types as an array of strings
      height: data.height / 10, // height in meters
      weight: data.weight / 10, // weight in kilograms
      abilities: data.abilities,
      moves: data.moves
    };
  }
}

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }