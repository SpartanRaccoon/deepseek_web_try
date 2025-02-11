<template>
  <div class="home">
    <v-container class="fill-height">
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" md="10" lg="8">
          <div class="text-center mb-16">
            <h1 class="text-h2 font-weight-bold chinese-title">大师</h1>
            <p class="text-h5 mt-4 chinese-subtitle">探索命运，发现智慧</p>
          </div>
          
          <v-row justify="center" class="reading-methods">
            <v-col v-for="(method, index) in readingMethods" :key="index" cols="12" sm="6" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :elevation="isHovering ? 8 : 2"
                  :class="['reading-card', { 'on-hover': isHovering }]"
                  @click="navigateToReading(method.type)"
                >
                  <div class="card-content text-center pa-6">
                    <v-icon :icon="method.icon" size="64" color="primary" class="mb-4"></v-icon>
                    <h3 class="text-h5 mb-2">{{ method.name }}</h3>
                    <p class="text-subtitle-1">{{ method.description }}</p>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const readingMethods = ref([
  {
    type: 'astrology',
    icon: 'mdi-zodiac-aquarius',
    name: '占星解读',
    description: '探索星盘能量，指引人生方向'
  },
  {
    type: 'purpleStar',
    icon: 'mdi-star-shooting',
    name: '紫微斗数',
    description: '揭示命盘天机，预见人生机遇'
  },
  {
    type: 'bazi',
    icon: 'mdi-yin-yang',
    name: '八字解读',
    description: '测算命理运势，把握人生机遇'
  }
])

const navigateToReading = (type) => {
  router.push(`/reading/${type}`)
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF9E5 0%, #FFE4E1 100%);
}

.chinese-title {
  color: #E31837;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 4rem;
  letter-spacing: 0.1em;
}

.chinese-subtitle {
  color: #333;
  opacity: 0.85;
}

.reading-methods {
  margin-top: 2rem;
}

.reading-card {
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(227, 24, 55, 0.1);
  backdrop-filter: blur(10px);
}

.reading-card.on-hover {
  transform: translateY(-8px);
  border-color: rgba(227, 24, 55, 0.3);
  box-shadow: 0 12px 20px -10px rgba(227, 24, 55, 0.3);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-icon {
  transition: transform 0.3s ease;
}

.on-hover .v-icon {
  transform: scale(1.1);
}
</style>
