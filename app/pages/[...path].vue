<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { ArrowLeft, Compass } from "@lucide/vue";
import { useHead } from "@unhead/vue";
import { buttonVariants } from "~/app/components/ui/button";

const route = useRoute();
const requestedPath = route.fullPath;

useHead({
  title: "Page not found | vuetro",
});
</script>

<template>
  <section class="mx-auto max-w-2xl py-12 sm:py-20">
    <div class="border-l-4 border-teal-600 pl-5 sm:pl-6">
      <p
        class="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700"
      >
        Error 404
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page has gone missing.
      </h1>
      <p class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        We could not find
        <code
          class="rounded bg-muted px-1.5 py-0.5 font-mono text-base text-foreground"
          >{{ requestedPath }}</code
        >. It may have moved, or the address may be incorrect.
      </p>
    </div>

    <div class="mt-9 flex flex-wrap gap-3">
      <RouterLink :class="buttonVariants()" to="/">
        <Compass class="size-4" />
        Go to home
      </RouterLink>
      <button
        type="button"
        :class="buttonVariants({ variant: 'outline' })"
        @click="$router.back()"
      >
        <ArrowLeft class="size-4" />
        Go back
      </button>
    </div>
  </section>
</template>
