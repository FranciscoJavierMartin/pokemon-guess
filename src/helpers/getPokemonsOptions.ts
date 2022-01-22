import pokemonApi from '@/api/pokemonApi';
import { Pokemon } from '@/interfaces/pokemon';

/**
 * Return an array with the available pokemon ids
 * @returns An array with numbers from zero to 649 (both includes)
 */
function getPokemons(): number[] {
  return Array.from(Array(650)).map((_, index) => index);
}

/**
 * Get the pokemon data from PokeAPI
 * @param pokemonIds Pokemon ids to get the data
 * @returns An array with the pokemon data
 */
async function getPokemonNames(pokemonIds: number[] = []): Promise<Pokemon[]> {
  return (
    await Promise.all(
      pokemonIds.map((pokemonId) => pokemonApi.get(`/${pokemonId}`))
    )
  ).map((pokemon) => ({ name: pokemon.data.name, id: pokemon.data.id }));
}

/**
 * Get pokemon to guest
 * @returns An array of four positions with the pokemon to guest
 */
export default function getPokemonsOptions(): Promise<Pokemon[]> {
  const shuffledPokemons = getPokemons().sort(() => Math.random() - 0.5);
  return getPokemonNames(shuffledPokemons.splice(0, 4));
}
