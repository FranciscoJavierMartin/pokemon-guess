import getPokemonsOptions from '@/helpers/getPokemonsOptions';

describe('getPokemonsOptions', () => {
  test('should return a shuffle array of pokemons', async () => {
    const pokemons = await getPokemonsOptions();
    expect(pokemons).toHaveLength(4);
    expect(pokemons).toEqual([
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
    ]);
  });
});
