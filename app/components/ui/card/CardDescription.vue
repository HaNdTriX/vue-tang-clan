<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/app/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <p
    v-bind="$attrs"
    data-slot="card-description"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
