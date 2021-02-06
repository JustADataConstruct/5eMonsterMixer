<template>
  <div id="app">
    <div class='container'>
      <div class='row'>
        <div class='col'>
          <h2><b>M</b>onster <b>M</b>ixer</h2>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <label>Monster 1</label>
          <b-form-select v-model="monster1" :options="monsters"></b-form-select>
        </div>
        <div class='col'>
          <label>Monster 2</label>
          <b-form-select v-model="monster2" :options="monsters"></b-form-select>
        </div>        
      </div>
      <div class='row mt-3'>
        <div class='col'>
          <b-button @click="mix" variant="danger">MIX</b-button>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <h3>{{this.result.name.toUpperCase()}}</h3>
          <h5>{{this.result.size}}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as Mixer from './mixer.js'

export default {
  data() {
    return {
      monsters: [],
      monster1 : '',
      monster2 : '',
      result : {
        name: '',
        size : ''
      }
    }
  },
  methods: {
    fetchMonsters() {
      const path = `http://www.dnd5eapi.co/api/monsters/`
      axios.get(path).then((response) => {
        var results = response.data.results;
        var o;
        for (o in results) {
          this.monsters.push(results[o].index);
        }
      })
    },
    mix() {
      console.log("1:",this.monster1);
      console.log("2:",this.monster2);
      this.result = Mixer.mix(this.monster1,this.monster2);
    }
  },
  created () {
    this.fetchMonsters();

  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
