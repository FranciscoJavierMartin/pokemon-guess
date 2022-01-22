import pokemonApi from '@/api/pokemonApi';
import { Pokemon } from '@/interfaces/pokemon';

function getPokemons(): number[] {
  return Array.from(Array(650)).map((_, index) => index);
}

async function getPokemonNames(pokemonIds: number[] = []): Promise<Pokemon[]> {
  return (
    await Promise.all(
      pokemonIds.map((pokemonId) => pokemonApi.get(`/${pokemonId}`))
    )
  ).map((pokemon) => ({ name: pokemon.data.name, id: pokemon.data.id }));
}

export default function getPokemonsOptions(): Promise<Pokemon[]> {
  const shuffledPokemons = getPokemons().sort(() => Math.random() - 0.5);
  return getPokemonNames(shuffledPokemons.splice(0, 4));
}
