<template>
  <h1 v-if="loading">Loading</h1>
  <div v-else>
    <h1>Which Pokemon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :options="pokemons" @selection="checkAnswer" />
    <div v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import getPokemonsOptions from '@/helpers/getPokemonsOptions';
import { Pokemon } from '@/interfaces/pokemon';

export default defineComponent({
  components: { PokemonPicture, PokemonOptions },
  data() {
    return {
      pokemons: [] as Pokemon[],
      pokemon: {} as Pokemon,
      loading: true,
      showPokemon: false,
      showAnswer: false,
      message: '',
    };
  },
  methods: {
    async getPokemons(): Promise<void> {
      this.pokemons = await getPokemonsOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemons[rndInt];

      this.loading = false;
    },
    checkAnswer(selectedId: number): void {
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Correct, ${this.pokemon.name}`;
      } else {
        this.message = `Wrong, it is ${this.pokemon.name}`;
      }
    },
    newGame(): void {
      this.showAnswer = false;
      this.showPokemon = false;
      this.loading = true;
      this.pokemons = [];
      this.pokemon = {} as Pokemon;
      this.message = '';
      this.getPokemons();
    },
  },
  mounted() {
    this.getPokemons();
  },
});
</script>
