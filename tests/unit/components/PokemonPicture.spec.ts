import { shallowMount } from '@vue/test-utils';
import PokemonPicture from '@/components/PokemonPicture.vue';

describe('PokemonPicture', () => {
  it('Snapshot', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: { pokemonId: 1, showPokemon: false },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show hidden image from pokemon 100', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: false },
    });

    const [img1, img2] = wrapper.findAll('img');

    expect(img1.exists()).toBeTruthy();
    expect(img2).toBeFalsy();
    expect(img1.classes('hidden-pokemon')).toBe(true);
    expect(img1.attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg'
    );
  });

  test('should show pokemon if showPokemon is true', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: true },
    });

    const img1 = wrapper.find('img');

    expect(img1.exists()).toBeTruthy();
    expect(img1.classes('hidden-pokemon')).toBe(false);
    expect(img1.classes('fade-in')).toBe(true);
  });
});
