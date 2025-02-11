<template>
  <div class="user-profile">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <!-- 个人信息卡片 -->
          <v-card class="glass-card mb-6">
            <v-card-title class="text-h4 text-center pa-4">
              {{ $t('profile.title') }}
            </v-card-title>
            
            <v-card-text>
              <v-form v-model="valid" @submit.prevent="saveProfile">
                <v-row>
                  <!-- 基本信息 -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.name"
                      :label="$t('profile.name')"
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.email"
                      :label="$t('profile.email')"
                      type="email"
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>

                  <!-- 出生信息 -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.birthDate"
                      :label="$t('profile.birthDate')"
                      type="date"
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profile.birthTime"
                      :label="$t('profile.birthTime')"
                      type="time"
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="profile.birthLocation"
                      :label="$t('profile.birthLocation')"
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- 保存按钮 -->
                <div class="text-center mt-4">
                  <v-btn
                    color="primary"
                    type="submit"
                    :loading="saving"
                    size="large"
                  >
                    {{ $t('profile.save') }}
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>

          <!-- 历史解读记录 -->
          <v-card class="glass-card">
            <v-card-title class="text-h4 text-center pa-4">
              {{ $t('profile.readingHistory') }}
            </v-card-title>
            
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th>{{ $t('profile.readingType') }}</th>
                    <th>{{ $t('profile.date') }}</th>
                    <th>{{ $t('profile.actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="reading in readingHistory" :key="reading.id">
                    <td>{{ $t(`reading.${reading.type}.title`) }}</td>
                    <td>{{ formatDate(reading.createdAt) }}</td>
                    <td>
                      <v-btn
                        icon="mdi-eye"
                        variant="text"
                        size="small"
                        @click="viewReading(reading.id)"
                      ></v-btn>
                      <v-btn
                        icon="mdi-share"
                        variant="text"
                        size="small"
                        @click="shareReading(reading.id)"
                      ></v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <!-- 分页 -->
              <div class="text-center mt-4">
                <v-pagination
                  v-model="page"
                  :length="totalPages"
                  @update:model-value="loadReadingHistory"
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const valid = ref(false)
const saving = ref(false)
const page = ref(1)
const totalPages = ref(1)

const profile = ref({
  name: '',
  email: '',
  birthDate: '',
  birthTime: '',
  birthLocation: ''
})

const readingHistory = ref([])

// 加载用户档案
const loadProfile = async () => {
  try {
    const response = await fetch('/api/user/profile')
    const data = await response.json()
    profile.value = data
  } catch (error) {
    console.error('Error loading profile:', error)
  }
}

// 保存用户档案
const saveProfile = async () => {
  if (!valid.value) return
  
  saving.value = true
  try {
    await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile.value)
    })
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    saving.value = false
  }
}

// 加载解读历史
const loadReadingHistory = async () => {
  try {
    const response = await fetch(`/api/readings/history?page=${page.value}`)
    const data = await response.json()
    readingHistory.value = data.readings
    totalPages.value = data.totalPages
  } catch (error) {
    console.error('Error loading reading history:', error)
  }
}

// 查看解读结果
const viewReading = (id) => {
  router.push(`/reading/result/${id}`)
}

// 分享解读结果
const shareReading = (id) => {
  const url = `${window.location.origin}/reading/result/${id}`
  navigator.clipboard.writeText(url)
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  loadProfile()
  loadReadingHistory()
})
</script>

<style scoped>
.user-profile {
  min-height: 100vh;
  padding: 2rem 0;
}

.glass-input {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 8px;
}

.glass-input:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}
</style>
