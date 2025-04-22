// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private selectedPokemonSubject = new BehaviorSubject<any>(null);
  selectedPokemon$ = this.selectedPokemonSubject.asObservable();

  open(pokemon: any) {
    this.selectedPokemonSubject.next(pokemon);
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
    this.selectedPokemonSubject.next(null);
  }
}
