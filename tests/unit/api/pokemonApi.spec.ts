import pokemonApi from '@/api/pokemonApi';

describe('pokemonApi', () => {
  test('setup well done', () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      'https://pokeapi.co/api/v2/pokemon'
    );
  });
});
