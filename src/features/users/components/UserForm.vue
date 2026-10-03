<script setup lang="ts">

import {useCreateUser} from "@/features/users/composable/useCreateUser.ts";

const emit = defineEmits<{ created: [userId: string] }>()

const {form, errors, isLoading, apiError, createdUser, submit} = useCreateUser()

const onSubmit = async () => {
  await submit()
  if (createdUser.value) emit('created', createdUser.value.Id)
}
</script>

<template>
  <section class="user-form-card" aria-labelledby="user-form-title">
    <div class="user-form-heading">
      <span class="user-form-eyebrow">User management</span>
      <h1 id="user-form-title">Create a user</h1>
      <p>Fill in the details below to add a new user to your workspace.</p>
    </div>

    <form class="user-form" novalidate @submit.prevent="onSubmit">
      <div class="form-grid">
        <div class="field">
          <label for="first_name">First Name</label>
          <input id="first_name" v-model="form.first_name" type="text" autocomplete="given-name" placeholder="Jane"/>
        </div>

        <div class="field">
          <label for="last_name">Last Name</label>
          <input id="last_name" v-model="form.last_name" type="text" autocomplete="family-name" placeholder="Doe"/>
        </div>

        <div class="field">
          <label for="username">Username</label>
          <input id="username" v-model="form.username" type="text" autocomplete="username" placeholder="janedoe"/>
          <small v-if="errors.username" class="field-error">{{ errors.username }}</small>
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" placeholder="jane@example.com"/>
          <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="form.password" type="password" autocomplete="new-password" placeholder="••••••••"/>
          <small v-if="errors.password" class="field-error">{{ errors.password }}</small>
        </div>

<!--        <div class="field">-->
<!--          <label for="phoneNumber">Phone Number</label>-->
<!--          <input id="phoneNumber" v-model="form.phoneNumber" type="tel" autocomplete="tel" placeholder="+33 6 12 34 56 78"/>-->
<!--        </div>-->
      </div>

      <p v-if="apiError" class="status-message status-error" role="alert">{{ apiError }}</p>
      <p v-if="createdUser" class="status-message status-success">User {{ createdUser.email }} created</p>

      <div class="form-footer">
        <span class="required-hint">All fields are handled securely.</span>
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading" class="button-spinner" aria-hidden="true"></span>
          {{ isLoading ? 'Creating...' : 'Create user' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  background: #f4f7fb;
  color: #172033;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.user-form-card {
  width: min(100%, 760px);
  margin: 4rem auto;
  overflow: hidden;
  border: 1px solid #e4e9f2;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 20px 60px rgba(42, 59, 95, 0.12), 0 3px 10px rgba(42, 59, 95, 0.04);
}

.user-form-heading {
  padding: 2.25rem 2.5rem 1.75rem;
  background: linear-gradient(135deg, #eef4ff 0%, #f8faff 100%);
  border-bottom: 1px solid #e8eef8;
}

.user-form-eyebrow {
  color: #5276d9;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0.5rem 0 0.45rem;
  color: #17264d;
  font-size: clamp(1.65rem, 4vw, 2.1rem);
  letter-spacing: -0.04em;
}

.user-form-heading p {
  max-width: 500px;
  margin: 0;
  color: #697792;
  font-size: 0.95rem;
  line-height: 1.55;
}

.user-form {
  padding: 2rem 2.5rem 2.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1.1rem;
}

.field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.45rem;
}

label {
  color: #33415f;
  font-size: 0.82rem;
  font-weight: 700;
}

input {
  width: 100%;
  border: 1px solid #d9e0ec;
  border-radius: 10px;
  outline: none;
  padding: 0.78rem 0.9rem;
  background: #fbfcfe;
  color: #172033;
  font: inherit;
  font-size: 0.92rem;
  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

input::placeholder {
  color: #aab4c6;
}

input:hover {
  border-color: #b8c5db;
}

input:focus {
  border-color: #6688e5;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(102, 136, 229, 0.14);
}

.field-error {
  color: #d04d61;
  font-size: 0.75rem;
}

.status-message {
  margin: 1.5rem 0 0;
  border-radius: 10px;
  padding: 0.8rem 0.95rem;
  font-size: 0.85rem;
  line-height: 1.4;
}

.status-error {
  border: 1px solid #f3c9d0;
  background: #fff4f5;
  color: #b33b50;
}

.status-success {
  border: 1px solid #bfe4d2;
  background: #f1fbf5;
  color: #22734a;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #edf0f5;
}

.required-hint {
  color: #8a96aa;
  font-size: 0.75rem;
}

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-width: 140px;
  border: 0;
  border-radius: 10px;
  padding: 0.82rem 1.15rem;
  background: #5276d9;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 750;
  box-shadow: 0 8px 18px rgba(82, 118, 217, 0.22);
  transition: background 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

button:hover:not(:disabled) {
  background: #4165c5;
  box-shadow: 0 10px 22px rgba(82, 118, 217, 0.3);
  transform: translateY(-1px);
}

button:focus-visible {
  outline: 3px solid rgba(82, 118, 217, 0.3);
  outline-offset: 3px;
}

button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.button-spinner {
  width: 0.85rem;
  height: 0.85rem;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .user-form-card {
    margin: 1.25rem;
    border-radius: 18px;
  }

  .user-form-heading,
  .user-form {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-footer {
    align-items: stretch;
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}

</style>
