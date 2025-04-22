export interface Pokemon {
    id: number;
    name: string;
    img: string;
    type: string[];
    height: number;
    weight: number;
    abilities: {ability: {name: string}}[];
    moves: {move: {name: string}}[]
  }