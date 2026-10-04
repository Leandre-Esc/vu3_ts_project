<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { getUsers } from '@/features/users/api/users.api.ts'
import type { User } from '@/features/users/types/user.types.ts'

const users = ref<User[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadUsers = async () => {
  isLoading.value = true
  error.value = null
  try {
    users.value = await getUsers()
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message ?? 'Impossible de charger les utilisateurs.'
    } else {
      error.value = 'Une erreur inattendue est survenue.'
    }
  } finally {
    isLoading.value = false
  }
}

const displayName = (user: User) => [user.firstName, user.lastName].filter(Boolean).join(' ') || user.userName

onMounted(loadUsers)
</script>

<template>
  <section class="user-list-card" aria-labelledby="user-list-title">
    <div class="user-list-heading">
      <div>
        <span class="user-list-eyebrow">Workspace directory</span>
        <h1 id="user-list-title">All users</h1>
        <p>Browse the people currently registered in your workspace.</p>
      </div>
      <button class="refresh-button" type="button" :disabled="isLoading" @click="loadUsers">
        <span aria-hidden="true">↻</span> Refresh
      </button>
    </div>

    <div class="user-list-content">
      <div v-if="isLoading" class="list-state">
        <span class="loading-orb" aria-hidden="true"></span>
        <span>Loading users...</span>
      </div>
      <div v-else-if="error" class="list-state list-state-error" role="alert">
        <strong>Could not load users</strong>
        <span>{{ error }}</span>
        <button type="button" class="retry-button" @click="loadUsers">Try again</button>
      </div>
      <div v-else-if="users.length === 0" class="list-state">
        <strong>No users yet</strong>
        <span>Create the first user from the button above.</span>
      </div>
      <div v-else class="users-table" role="table" aria-label="Users">
        <div class="users-table-header" role="row">
          <span role="columnheader">User</span>
          <span role="columnheader">Username</span>
          <span role="columnheader">Email</span>
        </div>
        <div v-for="user in users" :key="user.Id" class="user-row" role="row">
          <div class="user-identity" role="cell">
            <span class="user-avatar" aria-hidden="true">{{ displayName(user).charAt(0).toUpperCase() }}</span>
            <span>
              <strong>{{ displayName(user) }}</strong>
              <small>{{ user.firstName || 'Registered user' }}</small>
            </span>
          </div>
          <span class="user-username" role="cell">@{{ user.userName }}</span>
          <span class="user-email" role="cell">{{ user.email }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user-list-card { width: min(100%, 900px); margin: 4rem auto; overflow: hidden; border: 1px solid #e4e9f2; border-radius: 24px; background: rgba(255,255,255,.96); box-shadow: 0 20px 60px rgba(42,59,95,.12), 0 3px 10px rgba(42,59,95,.04); }
.user-list-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; padding: 2.25rem 2.5rem 1.75rem; background: linear-gradient(135deg,#eef4ff 0%,#f8faff 100%); border-bottom: 1px solid #e8eef8; }
.user-list-eyebrow { color: #5276d9; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
h1 { margin: .5rem 0 .45rem; color: #17264d; font-size: clamp(1.65rem,4vw,2.1rem); letter-spacing: -.04em; }
.user-list-heading p { margin: 0; color: #697792; font-size: .95rem; line-height: 1.55; }
.refresh-button,.retry-button { border: 0; border-radius: 10px; padding: .72rem .9rem; background: #5276d9; color: white; cursor: pointer; font: inherit; font-size: .82rem; font-weight: 700; white-space: nowrap; }
.refresh-button:disabled { cursor: wait; opacity: .65; }
.refresh-button span { margin-right: .35rem; font-size: 1.05rem; }
.user-list-content { padding: 1.1rem 2.5rem 2.25rem; }
.users-table-header,.user-row { display: grid; grid-template-columns: 1.25fr .8fr 1.3fr; gap: 1rem; align-items: center; }
.users-table-header { padding: .8rem 1rem; color: #8a96aa; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.user-row { padding: 1rem; border-top: 1px solid #edf0f5; color: #52617c; font-size: .88rem; }
.user-row:hover { background: #fafcff; }
.user-identity { display: flex; align-items: center; gap: .75rem; min-width: 0; }
.user-identity > span:last-child { display: flex; min-width: 0; flex-direction: column; gap: .2rem; }
.user-identity strong { overflow: hidden; color: #263557; text-overflow: ellipsis; white-space: nowrap; }
.user-identity small { color: #9aa5b8; font-size: .74rem; }
.user-avatar { display: grid; flex: 0 0 2.25rem; width: 2.25rem; height: 2.25rem; place-items: center; border-radius: 50%; background: #e5ecff; color: #5276d9; font-weight: 800; }
.user-username { color: #5276d9; font-weight: 650; }
.user-email { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.list-state { display: flex; min-height: 230px; align-items: center; justify-content: center; flex-direction: column; gap: .5rem; color: #7b879d; text-align: center; }
.list-state strong { color: #263557; font-size: 1rem; }
.list-state-error,.list-state-error strong { color: #b33b50; }
.retry-button { margin-top: .7rem; background: #b33b50; }
.loading-orb { width: 1.8rem; height: 1.8rem; margin-bottom: .4rem; border: 3px solid #dfe7fa; border-top-color: #5276d9; border-radius: 50%; animation: spin 700ms linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 680px) { .user-list-heading,.user-list-content { padding-right: 1.2rem; padding-left: 1.2rem; } .user-list-heading { flex-direction: column; } .users-table-header { display: none; } .user-row { grid-template-columns: 1fr; gap: .55rem; padding: 1.1rem .5rem; } .user-email { padding-left: 3rem; } }
</style>
