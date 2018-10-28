<template>
  <v-layout id="form" column align-center>
    <v-btn @click="newTypeBug">
      Yes, and it wouldn't have happened if we had types!
    </v-btn>
    <v-btn @click="newOtherBug">
      Yes! But types wouldn't have helped.
    </v-btn>
    <v-btn disabled>No. (coming soon)</v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Form',
  methods: {
    ...mapActions([
      'newTypeBug',
      'newOtherBug',
    ]),
  },
});
</script>

<style scoped>
</style>
