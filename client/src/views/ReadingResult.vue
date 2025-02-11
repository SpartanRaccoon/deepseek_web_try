<template>
  <v-container class="fill-height">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="reading-card" v-if="reading && reading.data">
          <v-card-text class="pa-6">
            <div class="text-center mb-8">
              <h2 class="text-h4 font-weight-bold text-primary mb-2">
                {{ readingTypeTitle }}
              </h2>
              <p class="text-subtitle-1 text-medium-emphasis">
                {{ userInfo }}
              </p>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="result-content" v-if="reading.result">
              <div class="mb-6">
                <h3 class="text-h6 font-weight-bold mb-3">解读摘要</h3>
                <p class="text-body-1">{{ reading.result.summary }}</p>
              </div>

              <div class="mb-6">
                <h3 class="text-h6 font-weight-bold mb-3">详细分析</h3>
                <p class="text-body-1" style="white-space: pre-line">{{ reading.result.details }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <div v-else class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
          <p class="mt-4 text-body-1">正在加载解读结果...</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { readingService } from '@/services/api'

const route = useRoute()
const router = useRouter()
const type = ref(route.params.type)
const reading = ref(null)
const error = ref(null)

const readingTypeTitle = computed(() => {
  const titles = {
    astrology: '占星解读',
    purpleStar: '紫微斗数',
    bazi: '八字解读'
  }
  return titles[type.value] || ''
})

const userInfo = computed(() => {
  if (!reading.value || !reading.value.data) return ''
  const { name, birthDate, birthTime } = reading.value.data
  return `${name} | ${birthDate} ${birthTime}`
})

onMounted(async () => {
  try {
    const { data } = await readingService.getReading(route.params.id)
    if (!data) {
      throw new Error('未找到解读结果')
    }
    reading.value = data
  } catch (error) {
    console.error('Error loading reading:', error)
    error.value = error.message
  }
})
</script>

<style scoped>
.reading-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(227, 24, 55, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.reading-card:hover {
  border-color: rgba(227, 24, 55, 0.2);
  box-shadow: 0 8px 16px -4px rgba(227, 24, 55, 0.1);
}

.result-content {
  line-height: 1.8;
}
</style>
