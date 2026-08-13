<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import "./assets/style.css";
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-900">
    <header class="border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-lg font-bold tracking-wide text-teal-800"
        >
          <img src="/favicon.svg" alt="" class="size-7" />
          vuetro
        </RouterLink>
        <nav
          aria-label="Main navigation"
          class="flex items-center gap-1 text-sm font-medium"
        >
          <RouterLink
            to="/"
            class="rounded-md px-3 py-2 text-stone-600 transition hover:bg-stone-200 hover:text-stone-950"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/ssr"
            class="rounded-md px-3 py-2 text-stone-600 transition hover:bg-stone-200 hover:text-stone-950"
          >
            SSR
          </RouterLink>
          <RouterLink
            to="/ssg"
            class="rounded-md px-3 py-2 text-stone-600 transition hover:bg-stone-200 hover:text-stone-950"
          >
            SSG
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <RouterView />
    </main>
  </div>
</template>
