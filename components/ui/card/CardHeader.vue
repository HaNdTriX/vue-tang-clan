<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div
    v-bind="$attrs"
    data-slot="card-header"
    :class="cn('grid gap-1.5 px-6 pt-6', props.class)"
  >
    <slot />
  </div>
</template>
