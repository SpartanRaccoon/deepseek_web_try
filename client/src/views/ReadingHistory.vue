<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">{{ $t('nav.history') }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card v-if="loading" class="pa-3">
          <v-skeleton-loader
            type="article"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-card>

        <template v-else-if="readings.length > 0">
          <v-card
            v-for="reading in readings"
            :key="reading._id"
            class="mb-4"
            :class="{ 'elevation-8': hover }"
          >
            <v-card-title class="d-flex justify-space-between">
              <span>{{ $t(`readings.${reading.type}`) }}</span>
              <span class="text-caption">{{ formatDate(reading.createdAt) }}</span>
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="text-subtitle-2">{{ $t('readings.birthInfo') }}:</div>
                  <div>{{ reading.birthData.date }} {{ reading.birthData.time }}</div>
                  <div>{{ reading.birthData.location }}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="text-subtitle-2">{{ $t('common.info') }}:</div>
                  <div class="text-truncate">{{ reading.result.summary }}</div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                variant="text"
                :to="'/reading/' + reading._id"
              >
                {{ $t('common.view') }}
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="shareReading(reading)"
              >
                {{ $t('readings.shareReading') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="text"
                @click="confirmDelete(reading)"
              >
                {{ $t('readings.deleteReading') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>

        <v-card v-else class="pa-6 text-center">
          <v-icon
            size="64"
            color="primary"
            class="mb-4"
          >
            mdi-book-open-page-variant
          </v-icon>
          <div class="text-h6">{{ $t('readings.noHistory') }}</div>
          <div class="text-body-1 mt-2">{{ $t('readings.startFirstReading') }}</div>
          <v-btn
            color="primary"
            class="mt-4"
            to="/reading"
          >
            {{ $t('readings.startReading') }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- 删除确认对话框 -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>{{ $t('common.confirm') }}</v-card-title>
        <v-card-text>{{ $t('readings.confirmDelete') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="deleteDialog = false"
          >
            {{ $t('common.cancel') }}
          </v-btn>
          <v-btn
            color="error"
            variant="text"
            @click="deleteReading"
          >
            {{ $t('common.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享对话框 -->
    <v-dialog v-model="shareDialog" max-width="400">
      <v-card>
        <v-card-title>{{ $t('readings.shareReading') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="shareUrl"
            readonly
            label="Share URL"
            append-icon="mdi-content-copy"
            @click:append="copyShareUrl"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="shareDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const loading = ref(true)
const readings = ref([])
const deleteDialog = ref(false)
const shareDialog = ref(false)
const selectedReading = ref(null)
const shareUrl = ref('')

// 获取阅读历史
const fetchReadings = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/readings')
    readings.value = response.data
  } catch (error) {
    console.error('Error fetching readings:', error)
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// 确认删除
const confirmDelete = (reading) => {
  selectedReading.value = reading
  deleteDialog.value = true
}

// 删除阅读
const deleteReading = async () => {
  try {
    await axios.delete(`/api/readings/${selectedReading.value._id}`)
    readings.value = readings.value.filter(r => r._id !== selectedReading.value._id)
    deleteDialog.value = false
  } catch (error) {
    console.error('Error deleting reading:', error)
  }
}

// 分享阅读
const shareReading = async (reading) => {
  try {
    const response = await axios.post(`/api/readings/${reading._id}/share`)
    shareUrl.value = `${window.location.origin}/shared/${response.data.shareToken}`
    shareDialog.value = true
  } catch (error) {
    console.error('Error sharing reading:', error)
  }
}

// 复制分享链接
const copyShareUrl = () => {
  navigator.clipboard.writeText(shareUrl.value)
}

onMounted(() => {
  fetchReadings()
})
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
</style>
