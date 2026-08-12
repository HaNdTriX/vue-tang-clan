<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <h2
    v-bind="$attrs"
    data-slot="card-title"
    :class="cn('font-semibold leading-none tracking-tight', props.class)"
  >
    <slot />
  </h2>
</template>
