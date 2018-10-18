<template>
  <v-layout id="form" column align-center>
    <v-btn @click="$emit('bug-encountered', true)">
      Yes, and it wouldn't have happened if we had types!
    </v-btn>
    <v-btn @click="$emit('bug-encountered', false)">
      Yes! But types wouldn't have helped.
    </v-btn>
    <v-btn disabled>No. (coming soon)</v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Form',
});
</script>

<style scoped>
</style>
