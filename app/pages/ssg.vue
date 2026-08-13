<script setup lang="ts">
import { Box, Palette, Sparkles } from "@lucide/vue";
import { useHead } from "@unhead/vue";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";

useHead({
  title: "Static example",
});

const examples = [
  {
    icon: Box,
    title: "Local ownership",
    description:
      "Components live in this repository, so their markup and styling remain yours to adapt.",
  },
  {
    icon: Palette,
    title: "Theme tokens",
    description:
      "The generated CSS variables keep component colors aligned across the application.",
  },
  {
    icon: Sparkles,
    title: "Composable building blocks",
    description:
      "Buttons and cards provide a reusable base without imposing a runtime design system.",
  },
];
</script>

<template>
  <section>
    <div class="max-w-2xl">
      <p
        class="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700"
      >
        Static generation
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight">
        Build once, serve quickly.
      </h1>
      <p class="mt-4 text-lg leading-8 text-muted-foreground">
        This route is prerendered during <code>pnpm build</code>. It also
        doubles as a compact tour of the local shadcn-vue primitives.
      </p>
    </div>

    <div class="mt-10 grid gap-4 md:grid-cols-3">
      <Card v-for="example in examples" :key="example.title">
        <CardHeader class="pb-6">
          <component :is="example.icon" class="mb-2 size-5 text-teal-700" />
          <CardTitle>{{ example.title }}</CardTitle>
          <CardDescription>{{ example.description }}</CardDescription>
        </CardHeader>
      </Card>
    </div>

    <div class="mt-10 border-t pt-8">
      <p class="mb-4 text-sm font-medium text-muted-foreground">
        Button variants remain interactive after the static HTML hydrates.
      </p>
      <div class="flex flex-wrap gap-3">
        <Button>Primary action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  </section>
</template>
