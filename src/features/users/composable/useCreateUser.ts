import type {CreateUserForm, User} from "@/features/users/types/user.types.ts";
import {reactive, ref} from "vue";
import {createUser} from "@/features/users/api/users.api.ts";
import axios from "axios";

type FormErrors = Partial<Record<keyof CreateUserForm, string>>

export function useCreateUser() {
    const form = reactive<CreateUserForm>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        // phoneNumber: 0
    })

    const errors = ref<FormErrors>({})
    const isLoading = ref(false)
    const apiError = ref<string | null>(null)
    const createdUser = ref<User | null>(null)

    const validate = (): boolean => {
        const e: FormErrors = {}
        if (!form.username.trim()) e.username = 'Username is required'
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email'
        if (form.password.length < 8) e.password = 'Password required minimum 8 characters'
        errors.value = e
        return Object.keys(e).length === 0
    }

    const reset = () => {
        Object.assign(form, {first_name: '', last_name: '', username: '', email: '', password: ''})
    }

    const submit = async () => {
        apiError.value = null
        if (!validate()) return

        isLoading.value = true
        try {
            createdUser.value = await createUser({...form})
            reset()
        } catch (err) {
            if (axios.isAxiosError(err)) {
                apiError.value = err.response?.data?.message ?? 'Server error'
            } else {
                apiError.value = 'Unexpected error occurred'
            }
        } finally {
            isLoading.value = false
        }
    }

    return { form, errors, isLoading, apiError, createdUser, submit }
}