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

    let currentZoom = 1

    const drawPoints = (activePoint) => {
      for (const point of this.data) {
        context.beginPath()
        context.fillStyle = point.pointData._type === 'ARTICLE' ? 'rgba(105, 179, 162, 1)' : 'rgba(128, 128, 128, 0.8)'

        const px = coordinateScaleX(point.x)
        const py = coordinateScaleY(point.y)
        const r = point.pointData._type === 'ARTICLE' ? radiusScaleArticle(point.pointData.engagement.overallScore) : 20

        context.arc(px, py, r, 0, 2 * Math.PI, true)

        if (point.pointData._type === 'TOPIC' && currentZoom > 2) {
          const textWidth = context.measureText(point.pointData.title).width
          context.fillText(point.pointData.title, px - (textWidth / 2), py - 25)
        }

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
        currentZoom = e.transform.k
      }))

    let hoveredPoint = null

    // TODO: handle zoom / pan as well
    d3.select(context.canvas).on('mousemove', (event) => {
      hoveredPoint = null

      this.data.forEach(point => {
        const circle = new Path2D()

        const px = coordinateScaleX(point.x)
        const py = coordinateScaleY(point.y)
        const r = point.pointData._type === 'ARTICLE' ? radiusScaleArticle(point.pointData.engagement.overallScore) : 20

        circle.arc(px, py, r, 0, 2 * Math.PI, true)

        if (context.isPointInPath(circle, event.offsetX, event.offsetY)) {
          hoveredPoint = point
        }
      })

      if (hoveredPoint) {
        context.canvas.style.cursor = 'pointer'
        console.log(hoveredPoint)
      } else {
        context.canvas.style.cursor = 'auto'
      }
    })
  }
}
</script>
