<template>
  <div class="home">
    <BubbleChartD3 :data="$store.getters.data.points" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BubbleChartD3 from '@/components/BubbleChartD3.vue'

export default defineComponent({
  name: 'Home',
  components: { BubbleChartD3 }
})
</script>
