<script setup lang="ts">

import { ref } from 'vue'
import { UserForm, UserList } from '@/features/users'

const activeView = ref<'create' | 'list'>('create')
const listRefreshKey = ref(0)

const showListAfterCreation = () => {
  listRefreshKey.value++
  activeView.value = 'list'
}
</script>

<template>
  <header class="app-header">
    <div class="brand">
      <span class="brand-mark">U</span>
      <span>Users workspace</span>
    </div>
    <nav class="view-switch" aria-label="User views">
      <button type="button" :class="{ active: activeView === 'create' }" @click="activeView = 'create'">Create user</button>
      <button type="button" :class="{ active: activeView === 'list' }" @click="activeView = 'list'">All users</button>
    </nav>
  </header>
  <main>
    <UserForm v-if="activeView === 'create'" @created="showListAfterCreation" />
    <UserList v-else :key="listRefreshKey" />
  </main>
</template>

<style scoped>
.app-header { display: flex; width: min(100% - 2rem, 900px); align-items: center; justify-content: space-between; gap: 1rem; margin: 1.5rem auto 0; }
.brand { display: flex; align-items: center; gap: .65rem; color: #263557; font-size: .9rem; font-weight: 800; }
.brand-mark { display: grid; width: 2rem; height: 2rem; place-items: center; border-radius: 9px; background: #5276d9; color: white; box-shadow: 0 6px 14px rgba(82,118,217,.25); }
.view-switch { display: flex; padding: .25rem; border: 1px solid #e1e7f1; border-radius: 12px; background: rgba(255,255,255,.8); box-shadow: 0 5px 18px rgba(42,59,95,.06); }
.view-switch button { border: 0; border-radius: 8px; padding: .58rem .8rem; background: transparent; color: #7b879d; cursor: pointer; font: inherit; font-size: .78rem; font-weight: 750; }
.view-switch button.active { background: #eaf0ff; color: #4165c5; }
@media (max-width: 560px) { .app-header { align-items: flex-start; flex-direction: column; } }
</style>
