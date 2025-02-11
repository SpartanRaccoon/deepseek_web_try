<template>
  <div class="not-found">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <div class="text-h1 font-weight-bold mb-6">404</div>
          <div class="text-h4 mb-6">{{ $t('error.pageNotFound') }}</div>
          <div class="text-body-1 mb-8">{{ $t('error.pageNotFoundDesc') }}</div>
          <v-btn
            color="primary"
            size="large"
            @click="$router.push('/')"
          >
            {{ $t('common.backToHome') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(45,45,45,0.8) 100%);
}
</style>
