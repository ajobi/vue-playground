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

    const coordinateScaleX = d3.scaleLinear()
    const coordinateScaleY = d3.scaleLinear()
    const radiusScaleArticle = d3.scaleLinear()

    coordinateScaleX.domain([-200, 200]).range([0, chartWidth * defaultZoom])
    coordinateScaleY.domain([-200, 200]).range([0, chartHeight * defaultZoom])
    radiusScaleArticle.domain([0, 10]).range([0, 3])

    const canvasChart = d3.select('#chart').append('canvas')
      .attr('width', chartWidth)
      .attr('height', chartHeight)

    const context = canvasChart.node().getContext('2d')

    context.fillStyle = '#EEE'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    const drawPoints = () => {
      for (const point of this.data) {
        context.beginPath()
        context.fillStyle = point.pointData._type === 'ARTICLE' ? '#69b3a2' : 'gray'

        const px = coordinateScaleX(point.x)
        const py = coordinateScaleY(point.y)
        const r = point.pointData._type === 'ARTICLE' ? radiusScaleArticle(point.pointData.engagement.overallScore) : 20

        context.arc(px, py, r, 0, 2 * Math.PI, true)
        context.closePath()
        context.fill()
      }
    }

    drawPoints()

    d3.select(context.canvas).call(d3.zoom().scaleExtent([1, 8])
      .on('zoom', (e) => {
        context.save()
        context.clearRect(0, 0, chartWidth, chartHeight)

        context.fillStyle = '#EEE'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        context.translate(e.transform.x, e.transform.y)
        context.scale(e.transform.k, e.transform.k)

        drawPoints()

        context.restore()
      }))

    // const svg = d3.select('#chart').append('svg')
    //   .attr('width', chartWidth)
    //   .attr('height', chartHeight)

    // svg.append('rect')
    //   .attr('width', '100%')
    //   .attr('height', '100%')
    //   .attr('fill', '#EEE')

    // svg.selectAll('circle')
    //   .data(this.data).enter()
    //   .append('circle')
    //   .attr('cx', d => coordinateScaleX(d.x))
    //   .attr('cy', d => coordinateScaleY(d.y))
    //   .attr('r', d => d.pointData._type === 'ARTICLE' ? radiusScaleArticle(d.pointData.engagement.overallScore) : 20)
    //   .attr('fill', d => d.pointData._type === 'ARTICLE' ? '#69b3a2' : 'gray')
    //   .attr('cursor', 'pointer')
    //   .attr('data-type', d => d.pointData._type)
    //   .attr('data-id', d => d.pointData.id)
    //
    // svg.selectAll('circle').on('click', (d) => {
    //   alert(`${d.target.getAttribute('data-type')} ${d.target.getAttribute('data-id')}`)
    // })

    // svg.call(d3.zoom().on('zoom', (e) => d3.selectAll('#chart circle').attr('transform', e.transform)))
  }
}
</script>
