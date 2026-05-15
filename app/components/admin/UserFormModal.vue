<script setup lang="ts">
import type { AdminUser, MembershipTier, UserStatus } from '~/types/admin';
import type { UserFormData } from '~/composables/useAdminUsers';

const props = defineProps<{
  open: boolean;
  mode: 'create' | 'edit';
  user?: AdminUser | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  save: [data: UserFormData];
}>();

const form = reactive<UserFormData>({
  name: '',
  email: '',
  membershipTier: 'STANDARD',
  status: 'active',
});

const errors = reactive({ name: '', email: '' });

watch(
  () => [props.open, props.user] as const,
  ([open, user]) => {
    if (!open) return;
    if (props.mode === 'edit' && user) {
      form.name = user.name;
      form.email = user.email;
      form.membershipTier = user.membershipTier;
      form.status = user.status;
    } else {
      form.name = '';
      form.email = '';
      form.membershipTier = 'STANDARD';
      form.status = 'active';
    }
    errors.name = '';
    errors.email = '';
  },
  { immediate: true },
);

// ── Options ────────────────────────────────────────────────────────────────────
const tierCards = [
  {
    value: 'STANDARD' as MembershipTier,
    label: 'Standard',
    icon: 'i-lucide-shield',
    desc: 'Basic access',
    active:
      'border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-500/10',
    iconColor: 'text-gray-500 dark:text-gray-400',
    iconBg: 'bg-gray-100 dark:bg-gray-500/15',
  },
  {
    value: 'PREMIUM' as MembershipTier,
    label: 'Premium',
    icon: 'i-lucide-star',
    desc: 'Priority booking',
    active: 'border-primary bg-primary/5 dark:bg-primary/10',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    value: 'DIAMOND' as MembershipTier,
    label: 'Diamond',
    icon: 'i-lucide-gem',
    desc: 'VIP experience',
    active:
      'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-500/10',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
];

const statusCards = [
  {
    value: 'active' as UserStatus,
    label: 'Active',
    dot: 'bg-emerald-500',
    active:
      'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300',
  },
  {
    value: 'inactive' as UserStatus,
    label: 'Inactive',
    dot: 'bg-gray-400',
    active:
      'bg-gray-100 dark:bg-gray-500/15 border-gray-300 dark:border-gray-500/40 text-gray-600 dark:text-gray-300',
  },
  {
    value: 'suspended' as UserStatus,
    label: 'Suspended',
    dot: 'bg-red-500',
    active:
      'bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400',
  },
];

// ── Live preview ───────────────────────────────────────────────────────────────
const previewInitials = computed(() => {
  const parts = form.name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return parts
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const previewAvatarBg = computed(() =>
  props.mode === 'edit' && props.user ? props.user.avatarBg : 'bg-primary',
);

const previewStatusDot: Record<UserStatus, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-gray-400',
  suspended: 'bg-red-500',
};

// ── Actions ────────────────────────────────────────────────────────────────────
function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Name is required';
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ? ''
    : 'Valid email is required';
  return !errors.name && !errors.email;
}

function handleSave() {
  if (!validate()) return;
  emit('save', { ...form });
}

function close() {
  emit('update:open', false);
}
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="bg-white dark:bg-[#0a1a12] rounded-xl overflow-hidden">
        <!-- ── Colored Header with live preview ──────────────────────── -->
        <div
          class="bg-linear-to-br from-primary/8 via-primary/3 to-transparent border-b border-gray-200 dark:border-[#1a3028] px-6 pt-5 pb-6"
        >
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2.5">
              <div
                class="size-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"
              >
                <UIcon
                  :name="
                    mode === 'create'
                      ? 'i-lucide-user-plus'
                      : 'i-lucide-user-pen'
                  "
                  class="size-3.5 text-primary"
                />
              </div>
              <div>
                <h2
                  class="text-sm font-bold text-gray-900 dark:text-white leading-tight"
                >
                  {{ mode === 'create' ? 'Add New User' : 'Edit User' }}
                </h2>
                <p class="text-[11px] text-gray-400">
                  {{
                    mode === 'create'
                      ? 'Create a new member account'
                      : 'Update account details'
                  }}
                </p>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              @click="close"
            />
          </div>

          <!-- Avatar + name preview -->
          <div class="flex items-center gap-4">
            <div class="relative shrink-0">
              <div
                class="size-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-sm ring-2 ring-white/20 dark:ring-black/20"
                :class="previewAvatarBg"
              >
                {{ previewInitials }}
              </div>
              <span
                class="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full ring-2 ring-white dark:ring-[#0a1a12]"
                :class="previewStatusDot[form.status]"
              />
            </div>
            <div class="min-w-0">
              <p
                class="font-semibold text-sm text-gray-900 dark:text-white truncate"
              >
                {{ form.name || 'Full Name' }}
              </p>
              <p class="text-xs text-gray-400 truncate">
                {{ form.email || 'email@example.com' }}
              </p>
              <div class="flex items-center gap-1.5 mt-1">
                <UBadge
                  :color="
                    form.membershipTier === 'DIAMOND'
                      ? 'warning'
                      : form.membershipTier === 'PREMIUM'
                        ? 'primary'
                        : 'neutral'
                  "
                  variant="soft"
                  size="sm"
                >
                  {{ form.membershipTier }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Body ──────────────────────────────────────────────────── -->
        <div class="px-6 py-5 space-y-5">
          <UFormField label="Full Name" required :error="errors.name">
            <UInput
              v-model="form.name"
              placeholder="e.g. John Doe"
              icon="i-lucide-user"
              :color="errors.name ? 'error' : 'neutral'"
              class="w-full"
            />
          </UFormField>

          <!-- Email -->
          <UFormField label="Email Address" required :error="errors.email">
            <UInput
              v-model="form.email"
              type="email"
              placeholder="e.g. john@example.com"
              icon="i-lucide-mail"
              :color="errors.email ? 'error' : 'neutral'"
              class="w-full"
            />
          </UFormField>

          <!-- Membership Tier cards -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-gray-600 dark:text-gray-400"
              >Membership Tier</label
            >
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="t in tierCards"
                :key="t.value"
                type="button"
                class="relative flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border transition-all duration-150 text-center"
                :class="
                  form.membershipTier === t.value
                    ? t.active
                    : 'border-gray-200 dark:border-[#1a3028] hover:border-gray-300 dark:hover:border-[#243d30] hover:bg-gray-50 dark:hover:bg-white/2'
                "
                @click="form.membershipTier = t.value"
              >
                <div
                  class="size-8 rounded-lg flex items-center justify-center transition-colors"
                  :class="
                    form.membershipTier === t.value
                      ? t.iconBg
                      : 'bg-gray-100 dark:bg-white/5'
                  "
                >
                  <UIcon
                    :name="t.icon"
                    class="size-4 transition-colors"
                    :class="
                      form.membershipTier === t.value
                        ? t.iconColor
                        : 'text-gray-400'
                    "
                  />
                </div>
                <div>
                  <p
                    class="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight"
                  >
                    {{ t.label }}
                  </p>
                  <p class="text-[10px] text-gray-400 leading-tight mt-0.5">
                    {{ t.desc }}
                  </p>
                </div>
                <div
                  v-if="form.membershipTier === t.value"
                  class="absolute top-1.5 right-1.5 size-3.5 rounded-full bg-primary flex items-center justify-center"
                >
                  <UIcon name="i-lucide-check" class="size-2.5 text-white" />
                </div>
              </button>
            </div>
          </div>

          <!-- Account Status chips -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-gray-600 dark:text-gray-400"
              >Account Status</label
            >
            <div class="flex gap-2">
              <button
                v-for="s in statusCards"
                :key="s.value"
                type="button"
                class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-xs font-semibold transition-all duration-150"
                :class="
                  form.status === s.value
                    ? s.active
                    : 'border-gray-200 dark:border-[#1a3028] text-gray-500 hover:border-gray-300 dark:hover:border-[#243d30]'
                "
                @click="form.status = s.value"
              >
                <span class="size-1.5 rounded-full shrink-0" :class="s.dot" />
                {{ s.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- ── Footer ─────────────────────────────────────────────────── -->
        <div
          class="border-t border-gray-200 dark:border-[#1a3028] px-6 py-4 flex gap-3"
        >
          <UButton
            color="neutral"
            variant="outline"
            class="flex-1"
            size="md"
            @click="close"
          >
            Cancel
          </UButton>
          <UButton color="primary" class="flex-1" size="md" @click="handleSave">
            <UIcon
              :name="mode === 'create' ? 'i-lucide-plus' : 'i-lucide-check'"
              class="size-4"
            />
            {{ mode === 'create' ? 'Create User' : 'Save Changes' }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
