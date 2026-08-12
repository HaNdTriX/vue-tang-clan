<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { ArrowRight, CircleCheck, LoaderCircle, Server } from "@lucide/vue";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const message = ref("Ready to contact the server.");
const isLoading = ref(false);

async function callHello() {
  isLoading.value = true;

  try {
    const response = await fetch("/api/hello");
    const data = (await response.json()) as { api?: string };
    message.value = data.api
      ? `API response: ${data.api}`
      : "The API responded.";
  } catch {
    message.value = "The API could not be reached.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
    <div class="max-w-2xl">
      <p
        class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700"
      >
        Vue 3 + Nitro
      </p>
      <h1
        class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        A full-stack Vue starter with an honest amount of structure.
      </h1>
      <p class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        File-based routes, server-side rendering, static output, and a component
        system are already wired together.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <Button type="button" :disabled="isLoading" @click="callHello">
          <LoaderCircle v-if="isLoading" class="size-4 animate-spin" />
          <Server v-else class="size-4" />
          {{ isLoading ? "Contacting API" : "Call the API" }}
        </Button>
        <RouterLink :class="buttonVariants({ variant: 'outline' })" to="/hello">
          Explore components
          <ArrowRight class="size-4" />
        </RouterLink>
      </div>
    </div>

    <Card class="overflow-hidden">
      <CardHeader class="border-b bg-muted/30">
        <div class="flex items-center gap-2 text-sm font-medium text-teal-700">
          <CircleCheck class="size-4" />
          API playground
        </div>
        <CardTitle class="text-xl">/api/hello</CardTitle>
        <CardDescription
          >Test the Nitro route from the hydrated client.</CardDescription
        >
      </CardHeader>
      <CardContent class="py-6">
        <output
          class="block rounded-md border bg-muted/40 px-4 py-3 font-mono text-sm text-foreground"
        >
          {{ message }}
        </output>
      </CardContent>
      <CardFooter
        class="border-t bg-muted/20 pt-6 text-sm text-muted-foreground"
      >
        This request runs only after you choose to make it.
      </CardFooter>
    </Card>
  </section>
</template>
