<template>
  <div class="forgot-password">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="glass-card">
            <v-card-title class="text-h4 text-center pa-4">
              {{ $t('auth.forgotPassword') }}
            </v-card-title>
            
            <v-card-text>
              <p class="text-body-1 text-center mb-6">
                {{ $t('auth.forgotPasswordDesc') }}
              </p>

              <v-form v-model="valid" @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="email"
                  :label="$t('auth.email')"
                  type="email"
                  :rules="emailRules"
                  required
                  variant="outlined"
                  class="glass-input mb-6"
                ></v-text-field>

                <v-btn
                  block
                  color="primary"
                  size="large"
                  type="submit"
                  :loading="loading"
                  :disabled="!valid"
                >
                  {{ $t('auth.sendResetLink') }}
                </v-btn>

                <div class="text-center mt-4">
                  <v-btn
                    variant="text"
                    color="primary"
                    @click="$router.push('/login')"
                  >
                    {{ $t('auth.backToLogin') }}
                  </v-btn>
                </div>
              </v-form>

              <!-- 成功提示 -->
              <v-snackbar
                v-model="showSuccess"
                color="success"
                :timeout="5000"
              >
                {{ $t('auth.resetLinkSent') }}
              </v-snackbar>

              <!-- 错误提示 -->
              <v-snackbar
                v-model="showError"
                color="error"
                :timeout="5000"
              >
                {{ errorMessage }}
              </v-snackbar>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const valid = ref(false)
const loading = ref(false)
const email = ref('')
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const emailRules = [
  v => !!v || '请输入邮箱',
  v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址'
]

const handleSubmit = async () => {
  if (!valid.value) return
  
  loading.value = true
  try {
    await authStore.resetPassword(email.value)
    showSuccess.value = true
    email.value = '' // 清空输入
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '发送重置链接失败'
    showError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-password {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(45,45,45,0.8) 100%);
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
