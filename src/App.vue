<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height grid-list-lg>
        <v-layout column align-center>
          <v-flex xs12 sm8 md4 class="title-flex">
            <h1 class="display-1">
              Montoux needs <em>static type checking</em> and <em>type annotations</em>.
            </h1>
          </v-flex>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-8">
              <v-card-title>
                <h2 class="headline">
                  Problems that could have been fixed with types so far
                </h2>
              </v-card-title>
              <v-card-text>
                <Counter />
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-8">
              <v-card-title>
                <h2 class="headline">
                  Did you just encounter a bug or acute lack of documentation?
                </h2>
              </v-card-title>
              <v-card-text>
                <Form />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import Counter from './components/Counter.vue';
import Form from './components/Form.vue';


export default Vue.extend({
  name: 'App',
  components: {
    Counter,
    Form,
  },
});
</script>

<style scoped lang="sass">
em
  font-weight: 300

.title-flex
  display: flex
  align-items: center
</style>
