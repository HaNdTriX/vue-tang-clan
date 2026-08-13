<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { ArrowRight, CircleCheck, LoaderCircle, Server } from "@lucide/vue";
import { Button, buttonVariants } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { useHead } from "@unhead/vue";

useHead({
  title: "SSR example",
});

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
        SSR
      </p>
      <h1
        class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        Render the first view on the server.
      </h1>
      <p class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        Nitro renders this route into HTML for the request. Vue then hydrates
        the same markup in the browser, ready for interactions such as the API
        call.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <Button type="button" :disabled="isLoading" @click="callHello">
          <LoaderCircle v-if="isLoading" class="size-4 animate-spin" />
          <Server v-else class="size-4" />
          {{ isLoading ? "Contacting API" : "Call the API" }}
        </Button>
        <RouterLink :class="buttonVariants({ variant: 'outline' })" to="/ssg">
          Explore components
          <ArrowRight class="size-4" />
        </RouterLink>
      </div>
    </div>

    <Card class="overflow-hidden">
      <CardHeader class="border-b bg-muted/30">
        <div class="flex items-center gap-2 text-sm font-medium text-teal-700">
          <CircleCheck class="size-4" />
          SSR lifecycle
        </div>
        <CardTitle class="text-xl">HTML first, interactivity next</CardTitle>
        <CardDescription
          >The initial page is rendered by Nitro before Vue takes over in the
          browser.</CardDescription
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
        The request below runs client-side after hydration.
      </CardFooter>
    </Card>
  </section>
</template>
