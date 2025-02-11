<template>
  <v-app>
    <v-app-bar app color="transparent" elevation="0" class="px-4">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="primary"
      ></v-app-bar-nav-icon>

      <v-app-bar-title class="text-primary font-weight-bold">大师</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-for="item in mainNavItems"
        :key="item.title"
        :to="item.to"
        class="mx-2"
        variant="text"
        color="primary"
      >
        <v-icon start :icon="item.icon"></v-icon>
        {{ item.title }}
      </v-btn>


    </v-app-bar>

    <!-- 侧边导航栏 -->
    <v-navigation-drawer
      v-model="drawer"
      app
      class="glass-nav"
      width="300"
    >
      <v-list>
        <v-list-item class="mb-4">
          <div class="text-center py-4">
            <div class="text-h5 font-weight-bold text-primary mb-2">大师</div>
            <div class="text-subtitle-1">探索命运，发现智慧</div>
          </div>
        </v-list-item>

        <v-divider class="mb-4"></v-divider>

        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          color="primary"
          class="mb-2"
          rounded="lg"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4">
          <v-divider class="mb-4"></v-divider>
          <div class="text-caption text-center text-medium-emphasis">
            © 2025 大师. All rights reserved.
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- 主要内容区域 -->
    <v-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- 全局加载指示器 -->
    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        size="64"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)
const loading = ref(false)

const mainNavItems = [
  { title: '占星解读', to: '/reading/astrology', icon: 'mdi-zodiac-aquarius' },
  { title: '紫微斗数', to: '/reading/purpleStar', icon: 'mdi-star-shooting' },
  { title: '八字解读', to: '/reading/bazi', icon: 'mdi-yin-yang' }
]

const navItems = [
  { title: '首页', to: '/', icon: 'mdi-home' },
  { title: '占星解读', to: '/reading/astrology', icon: 'mdi-zodiac-aquarius' },
  { title: '紫微斗数', to: '/reading/purpleStar', icon: 'mdi-star-shooting' },
  { title: '八字解读', to: '/reading/bazi', icon: 'mdi-yin-yang' },
  { title: '历史记录', to: '/history', icon: 'mdi-history' }
]

</script>

<style scoped>
.main-content {
  background: linear-gradient(135deg, #FFF9E5 0%, #FFE4E1 100%);
  min-height: 100vh;
  position: relative;
}

.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/chinese-pattern.png');
  opacity: 0.1;
  pointer-events: none;
}

.glass-nav {
  background: rgba(255, 249, 229, 0.9) !important;
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(227, 24, 55, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
