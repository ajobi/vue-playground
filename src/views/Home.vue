<template>
  <div class="home">
    <BubbleChartD3 :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BubbleChartD3 from '@/components/BubbleChartD3.vue'

export default defineComponent({
  name: 'Home',
  components: { BubbleChartD3 },
  data () {
    return {
      data: [
        { x: 100, y: 60, val: 10 },
        { x: 30, y: 80, val: 20 },
        { x: 50, y: 40, val: 12 },
        { x: 190, y: 100, val: 40 },
        { x: 80, y: 170, val: 20 }
      ]
    }
  }
})
</script>
