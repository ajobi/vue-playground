import { h, ref, onMounted, onUpdated, onBeforeUpdate, computed, onBeforeUnmount } from '@vue/composition-api'
import { uniqueClasses } from 'swiper/vue/utils.js'
const SwiperSlide = {
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    swiperRef: {
      type: Object,
      required: false
    },
    zoom: {
      type: Boolean,
      default: undefined
    },
    virtualIndex: {
      type: [String, Number],
      default: undefined
    }
  },

  setup (props, {
    slots
  }) {
    let eventAttached = false
    const {
      swiperRef
    } = props
    const slideElRef = ref(null)
    const slideClasses = ref('swiper-slide')

    function updateClasses (swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames
      }
    }

    onMounted(() => {
      if (!swiperRef.value) { return }
      swiperRef.value.on('_slideClass', updateClasses)
      eventAttached = true
    })
    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value) { return }
      swiperRef.value.on('_slideClass', updateClasses)
      eventAttached = true
    })
    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) { return }

      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide'
        }
      }
    })
    onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value) { return }
      swiperRef.value.off('_slideClass', updateClasses)
    })
    const slideData = computed(() => ({
      isActive: slideClasses.value.includes('swiper-slide-active') || slideClasses.value.includes('swiper-slide-duplicate-active'),
      isVisible: slideClasses.value.includes('swiper-slide-visible'),
      isDuplicate: slideClasses.value.includes('swiper-slide-duplicate'),
      isPrev: slideClasses.value.includes('swiper-slide-prev') || slideClasses.value.includes('swiper-slide-duplicate-prev'),
      isNext: slideClasses.value.includes('swiper-slide-next') || slideClasses.value.includes('swiper-slide-duplicate-next')
    }))
    return () => {
      return h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        'data-swiper-slide-index': props.virtualIndex
      }, props.zoom
        ? h('div', {
          class: 'swiper-zoom-container',
          'data-swiper-zoom': typeof props.zoom === 'number' ? props.zoom : undefined
        }, slots.default && slots.default(slideData.value))
        : slots.default && slots.default(slideData.value))
    }
  }

}
export { SwiperSlide }
