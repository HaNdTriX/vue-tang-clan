<script setup lang="ts">
import { cn } from "~/app/lib/utils";
import { buttonVariants } from ".";

defineOptions({ inheritAttrs: false });

type ButtonProps = {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  class?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "default",
  size: "default",
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </button>
</template>
