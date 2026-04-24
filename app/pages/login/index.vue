<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import z from 'zod'
import { authService } from '~/services/auth'

const toast = useToast()
const router = useRouter()
const { setAuth } = useAuth()
const isLoading = ref(false)

const fields: AuthFormField[] = [{
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
}, {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
}]

const providers = [{
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
        toast.add({ title: 'Google', description: 'Login with Google' })
    }
}]

const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    isLoading.value = true
    try {
        const response = await authService.login({
            email: payload.data.email,
            password: payload.data.password,
        })
        setAuth(response)
        toast.add({
            title: 'Success',
            description: 'Login successful',
            color: 'success',
        })
        await router.push('/')
    } catch (error: any) {
        toast.add({
            title: 'Error',
            description: error.response?.data?.message || 'Login failed',
            color: 'error',
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4 h-screen">
        <UPageCard class="w-full max-w-md">
            <UAuthForm :schema="schema" title="Login" description="Enter your credentials to access your account."
                icon="i-lucide-user" :fields="fields" :providers="providers" @submit="onSubmit" />
        </UPageCard>
    </div>
</template>
