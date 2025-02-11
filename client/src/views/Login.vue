<template>
  <div class="login">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="glass-card">
            <v-card-title class="text-h4 text-center pa-4">
              {{ $t('auth.login') }}
            </v-card-title>
            
            <v-card-text>
              <v-form v-model="valid" @submit.prevent="handleLogin">
                <v-text-field
                  v-model="username"
                  :label="$t('auth.username')"
                  type="text"
                  :rules="usernameRules"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :label="$t('auth.password')"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>

                

                <v-btn
                  block
                  color="primary"
                  size="large"
                  type="submit"
                  :loading="loading"
                  :disabled="!valid"
                >
                  {{ $t('auth.loginButton') }}
                </v-btn>

                
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const usernameRules = [
  v => !!v || '请输入用户名',
  v => v.length >= 3 || '用户名至少需要3个字符'
]

const passwordRules = [
  v => !!v || '请输入密码',
  v => v.length >= 6 || '密码长度至少为6个字符'
]

const handleLogin = async () => {
  if (!valid.value) return
  
  loading.value = true
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    })
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  router.push('/forgot-password')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login {
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
