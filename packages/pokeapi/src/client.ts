import { createCherryClient } from "@b3-business/cherry";
import {
  listPokemon,
  getPokemon,
  getPokemonSpecies,
  listTypes,
  getType,
  getAbility,
  getMove,
  getGeneration,
  getBerry,
} from "./routes";

export const pokeApi = createCherryClient({
  baseUrl: "https://pokeapi.co/api/v2/",
  routes: {
    listPokemon,
    getPokemon,
    getPokemonSpecies,
    listTypes,
    getType,
    getAbility,
    getMove,
    getGeneration,
    getBerry,
  },
});
