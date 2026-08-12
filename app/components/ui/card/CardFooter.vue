<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/app/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div
    v-bind="$attrs"
    data-slot="card-footer"
    :class="cn('flex items-center px-6 pb-6', props.class)"
  >
    <slot />
  </div>
</template>
