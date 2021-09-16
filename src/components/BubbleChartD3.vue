<template>
  <div>
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
    const chartWidth = 1200
    const chartHeight = 700
    const defaultZoom = 1

    const svg = d3.select('#chart').append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)

    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#EEE')

    const coordinateScaleX = d3.scaleLinear()
    const coordinateScaleY = d3.scaleLinear()
    const radiusScaleArticle = d3.scaleLinear()

    coordinateScaleX.domain([-200, 200]).range([0, chartWidth * defaultZoom])
    coordinateScaleY.domain([-200, 200]).range([0, chartHeight * defaultZoom])
    radiusScaleArticle.domain([0, 10]).range([0, 3])

    svg.selectAll('circle')
      .data(this.data).enter()
      .append('circle')
      .attr('cx', d => coordinateScaleX(d.x))
      .attr('cy', d => coordinateScaleY(d.y))
      .attr('r', d => d.pointData._type === 'ARTICLE' ? radiusScaleArticle(d.pointData.engagement.overallScore) : 20)
      .attr('fill', d => d.pointData._type === 'ARTICLE' ? '#69b3a2' : 'gray')
      .attr('cursor', 'pointer')
      .attr('data-type', d => d.pointData._type)
      .attr('data-id', d => d.pointData.id)

    svg.selectAll('circle').on('click', (d) => {
      alert(`${d.target.getAttribute('data-type')} ${d.target.getAttribute('data-id')}`)
    })

    svg.call(d3.zoom().on('zoom', (e) => d3.selectAll('#chart circle').attr('transform', e.transform)))
  }
}
</script>
