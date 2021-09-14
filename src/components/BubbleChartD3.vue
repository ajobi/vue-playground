<template>
  <div style="text-align: center">
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
    const chartSize = 2000
    const defaultZoom = 1

    const svg = d3.select('#chart').append('svg')
      .attr('width', chartSize)
      .attr('height', chartSize)

    const coordinateScale = d3.scaleLinear()

    coordinateScale
      .domain([-200, 200])
      .range([0, chartSize * defaultZoom])

    svg.selectAll('circle')
      .data(this.data).enter()
      .append('circle')
      .attr('cx', d => coordinateScale(d.x))
      .attr('cy', d => coordinateScale(d.y))
      .attr('r', d => d.pointData._type === 'ARTICLE' ? d.pointData.engagement.overallScore : 40)
      .attr('fill', d => d.pointData._type === 'ARTICLE' ? '#69b3a2' : 'gray')

    svg.call(d3.zoom().on('zoom', (e) => d3.selectAll('#chart circle').attr('transform', e.transform)))
  }
}
</script>
