<template>
  <div id="counter">
    <svg :width="width" :height="height">
      <template v-if="allBugs > 0">
        <g
          :transform="`translate(${width / 2}, ${height / 2})`"
          class="pie-chunks">
          <path
            v-for="datum in pieData"
            :key="datum.data.label"
            :d="arc(datum)"
            :fill="color(datum)"
            class="pie-chunk" />
        </g>
        <g
          :transform="`translate(${width / 2}, ${height / 2})`"
          class="labels">
          <g
            v-for="datum in pieData"
            v-if="datum.data.count > 0"
            :key="datum.data.label"
            :transform="`translate(${arc.centroid(datum)})`">
            <text text-anchor="middle" dy="-.5em" class="label">
              {{ datum.data.label }}
            </text>
            <text text-anchor="middle" dy=".5em" class="label">
              {{ datum.data.count }}
            </text>
          </g>
        </g>
      </template>
      <text
        v-else
        :transform="`translate(${width / 2}, ${height / 2})`"
        text-anchor="middle"
        class="no-data">
        No data yet.
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapState, mapGetters } from 'vuex';
import * as d3 from 'd3';

interface Datum {
  readonly label: string;
  readonly count: number;
}

// Explicit bindings while waiting for https://github.com/vuejs/vuex/pull/1121
interface VuexBindings {
  readonly typeBugs: number;
  readonly otherBugs: number;
  readonly allBugs: number;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
  name: 'Counter',
  props: {
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 360,
    },
  },
  computed: {
    ...mapState([
      'typeBugs',
      'otherBugs',
    ]),
    ...mapGetters([
      'allBugs',
    ]),
    pieData(): Array<d3.PieArcDatum<Datum>> {
      const dataset: Datum[] = [
        { label: 'Type bugs', count: this.typeBugs },
        { label: 'Other bugs', count: this.otherBugs },
      ];
      const pie = d3.pie<Datum>()
        .value(d => d.count)
        .sort(null);
      return pie(dataset);
    },
    arc(): d3.Arc<any, d3.PieArcDatum<Datum>> {
      const radius = Math.min(this.width, this.height) / 2;
      const donutWidth = 100;
      return d3.arc<d3.PieArcDatum<Datum>>()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    },
  },
  methods: {
    color(datum: d3.PieArcDatum<Datum>): string {
      const color = d3.scaleOrdinal<string>()
        .domain(['Type bugs', 'Other bugs'])
        .range(['#CB6077', '#3B3228']);
      return color(datum.data.label);
    },
  },
});
</script>

<style scoped lang="sass">
#counter
  text-align: center
  & /deep/
    .pie-chunk:hover
      opacity: 0.9
    .label
      fill: white
      font-weight: bolder
    .no-data
      fill: gray
</style>
