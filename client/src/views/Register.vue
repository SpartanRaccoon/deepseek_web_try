<template>
  <div class="register">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="glass-card">
            <v-card-title class="text-h4 text-center pa-4">
              {{ $t('auth.register') }}
            </v-card-title>
            
            <v-card-text>
              <v-form v-model="valid" @submit.prevent="handleRegister">
                <v-text-field
                  v-model="name"
                  :label="$t('auth.name')"
                  :rules="nameRules"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :label="$t('auth.email')"
                  type="email"
                  :rules="emailRules"
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

                <v-text-field
                  v-model="confirmPassword"
                  :label="$t('auth.confirmPassword')"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="confirmPasswordRules"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>

                <!-- 出生信息 -->
                <v-text-field
                  v-model="birthDate"
                  :label="$t('auth.birthDate')"
                  type="date"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="birthTime"
                  :label="$t('auth.birthTime')"
                  type="time"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="birthLocation"
                  :label="$t('auth.birthLocation')"
                  required
                  variant="outlined"
                  class="glass-input mb-4"
                ></v-text-field>

                <v-checkbox
                  v-model="agreeToTerms"
                  :label="$t('auth.agreeToTerms')"
                  :rules="[v => !!v || $t('auth.mustAgree')]"
                  required
                  class="mb-4"
                ></v-checkbox>

                <v-btn
                  block
                  color="primary"
                  size="large"
                  type="submit"
                  :loading="loading"
                  :disabled="!valid || !agreeToTerms"
                >
                  {{ $t('auth.registerButton') }}
                </v-btn>

                <div class="text-center mt-4">
                  <span>{{ $t('auth.haveAccount') }}</span>
                  <v-btn
                    variant="text"
                    color="primary"
                    class="ml-2"
                    @click="goToLogin"
                  >
                    {{ $t('auth.login') }}
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const birthDate = ref('')
const birthTime = ref('')
const birthLocation = ref('')

const nameRules = [
  v => !!v || '请输入姓名',
  v => v.length <= 50 || '姓名不能超过50个字符'
]

const emailRules = [
  v => !!v || '请输入邮箱',
  v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址'
]

const passwordRules = [
  v => !!v || '请输入密码',
  v => v.length >= 6 || '密码长度至少为6个字符',
  v => /\d/.test(v) || '密码必须包含数字',
  v => /[a-zA-Z]/.test(v) || '密码必须包含字母'
]

const confirmPasswordRules = computed(() => [
  v => !!v || '请确认密码',
  v => v === password.value || '两次输入的密码不一致'
])

const handleRegister = async () => {
  if (!valid.value || !agreeToTerms.value) return
  
  loading.value = true
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      birthDate: birthDate.value,
      birthTime: birthTime.value,
      birthLocation: birthLocation.value
    })
    router.push('/login')
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register {
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
