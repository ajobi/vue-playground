<template>
  <div>
    <h1>Bubble chart d3</h1>
    <div id="chart" />
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    const svg = d3.select('#chart').append('svg')
      .attr('width', 1200)
      .attr('height', 1200)

    svg.selectAll('circle')
      .data(this.data).enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.val)
      .attr('fill', '#69b3a2')
  }
}
</script>
