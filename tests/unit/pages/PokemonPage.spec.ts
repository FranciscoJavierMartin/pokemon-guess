import { shallowMount, mount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage.vue';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage', () => {
  test('Snapshot', () => {
    const wrapper = shallowMount(PokemonPage);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('mounted should be called', () => {
    const getPokemonsSpy = jest.spyOn(
      PokemonPage.methods as any,
      'getPokemons'
    );
    const wrapper = shallowMount(PokemonPage);
    expect(getPokemonsSpy).toHaveBeenCalled();
  });

  test('Snapshot when data is loaded', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          loading: false,
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show PokemonPicture and PokemonOptions', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          loading: false,
          message: '',
        };
      },
    });

    expect(wrapper.find('pokemon-picture-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemon-options-stub').exists()).toBeTruthy();
    expect(wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe(
      '25'
    );
    expect(
      wrapper.find('pokemon-options-stub').attributes('options')
    ).toBeTruthy();
  });

  test('tests with checkAnswer', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          loading: false,
          message: '',
        };
      },
    });

    await wrapper.vm.checkAnswer(25);

    expect(wrapper.find('h2').exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find('h2').text()).toBe(`Correct, ${pokemons[0].name}`);
  });
});
