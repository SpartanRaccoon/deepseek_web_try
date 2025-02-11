<template>
  <div class="reading-input">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="glass-card">
            <v-card-title class="text-h4 text-center pa-4">
              {{ $t(`reading.${type}.title`) }}
            </v-card-title>
            
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
                <!-- Common Fields -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.name"
                      :label="$t('form.name')"
                      :rules="nameRules"
                      required
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.gender"
                      :items="genderOptions"
                      :label="$t('form.gender')"
                      required
                      variant="outlined"
                      class="glass-input"
                    ></v-select>
                  </v-col>
                </v-row>

                <!-- Birth Information -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.birthDate"
                      :label="$t('form.birthDate')"
                      type="date"
                      required
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.birthTime"
                      :label="$t('form.birthTime')"
                      type="time"
                      required
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Location -->
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.birthLocation"
                      :label="$t('form.birthLocation')"
                      required
                      variant="outlined"
                      class="glass-input"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- MBTI Specific Fields -->
                <v-row v-if="type === 'mbti'">
                  <v-col cols="12" v-for="(dimension, index) in mbtiDimensions" :key="index">
                    <v-slider
                      v-model="formData.mbtiScores[index]"
                      :label="$t(`form.mbti.${dimension}`)"
                      min="0"
                      max="100"
                      thumb-label
                      class="glass-input"
                    ></v-slider>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-btn
                      color="primary"
                      size="large"
                      type="submit"
                      :loading="loading"
                      :disabled="!valid"
                    >
                      {{ $t('form.submit') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { readingService } from '@/services/api'

const route = useRoute()
const router = useRouter()
const type = ref(route.params.type)
const valid = ref(false)
const loading = ref(false)

const formData = ref({
  name: '',
  gender: '',
  birthDate: '',
  birthTime: '',
  birthLocation: '',
  mbtiScores: [50, 50, 50, 50]
})

const genderOptions = [
  { title: 'form.gender.male', value: 'male' },
  { title: 'form.gender.female', value: 'female' },
  { title: 'form.gender.other', value: 'other' }
]

const mbtiDimensions = ['EI', 'SN', 'TF', 'JP']

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length <= 50 || 'Name must be less than 50 characters'
]

const submitForm = async () => {
  if (!valid.value) return;
  
  loading.value = true;
  try {
    const { data: result } = await readingService.createReading(type.value, formData.value);
    router.push(`/reading/${type.value}/result/${result.id}`);
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.reading-input {
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
