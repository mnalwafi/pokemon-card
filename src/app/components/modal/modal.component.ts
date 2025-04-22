import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}
  
  selectedPokemon$!: Observable<Pokemon>;

  ngOnInit(): void {
    this.selectedPokemon$ = this.modalService.selectedPokemon$;
  }
}
