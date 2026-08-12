<script setup lang="ts">
import { Globe2, Route, ServerCog } from "@lucide/vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";

const features = [
  {
    icon: Route,
    label: "File-based route",
    value: "/foo",
    detail: "Created from app/pages/foo.vue.",
  },
  {
    icon: ServerCog,
    label: "Server rendered",
    value: "SSR ready",
    detail: "Nitro renders the initial response.",
  },
  {
    icon: Globe2,
    label: "Static output",
    value: "Prerendered",
    detail: "The crawler discovers this route during builds.",
  },
];
</script>

<template>
  <section>
    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
      Route inspection
    </p>
    <h1 class="mt-3 text-4xl font-semibold tracking-tight">
      Foo is more than a placeholder.
    </h1>
    <p class="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
      This route is discovered by the Vue router and included in the static
      build through Nitro's prerender crawler.
    </p>

    <div class="mt-10 grid gap-4 sm:grid-cols-3">
      <Card v-for="feature in features" :key="feature.label">
        <CardHeader>
          <component :is="feature.icon" class="mb-2 size-5 text-teal-700" />
          <CardDescription>{{ feature.label }}</CardDescription>
          <CardTitle class="text-2xl">{{ feature.value }}</CardTitle>
        </CardHeader>
        <CardContent class="pb-6 text-sm text-muted-foreground">
          {{ feature.detail }}
        </CardContent>
      </Card>
    </div>
  </section>
</template>
