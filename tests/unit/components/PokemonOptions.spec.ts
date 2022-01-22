import { shallowMount, VueWrapper } from '@vue/test-utils';
import PokemonOptions from '@/components/PokemonOptions.vue';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonOptions', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, { props: { options: pokemons } });
  });

  test('Snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should four options', () => {
    const liTags = wrapper.findAll('li');
    expect(liTags).toHaveLength(4);
    pokemons.forEach((pokemon, index) => {
      expect(liTags[index].text()).toBe(pokemon.name);
    });
  });

  test('should emit "selection" event when click on one option', () => {
    const liTags = wrapper.findAll('li');

    liTags.forEach((li) => {
      li.trigger('click');
    });
    expect(wrapper.emitted('selection')).toHaveLength(pokemons.length);
    pokemons.forEach((pokemon, index) => {
      expect(wrapper.emitted('selection')![index]).toEqual([pokemon.id]);
    });
  });
});
