<template>
  <div class="root" style="height: 400px; overflow: auto" @scroll="handleScroll">
    <div class="spacer" :style="spacerStyle">
      <div v-for="(item, index) in visibleItems" :key="index" class="item" :style="{ height: `${rowHeight}px` }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface Item {
  text: string;
}
// Define a mixin object (if needed)
const passiveSupportMixin = {
  methods: {
    doesBrowserSupportPassiveScroll(): boolean {
      let passiveSupported = false;

      try {
        const options = {
          get passive() {
            passiveSupported = true;
            return false;
          }
        };

        // Change "test" to a valid event type like "scroll"
        window.addEventListener("scroll", () => { }, options);
        window.removeEventListener("scroll", () => { });
      } catch (err) {
        passiveSupported = false;
      }
      return passiveSupported;
    }
  }
};

// Reactive variables
const items = ref<Item[]>(new Array(10000)
  .fill(null)
  .map((_, index) => ({ text: `Item ${index + 1}` }))
);

const rootHeight = ref<number>(400);
const rowHeight = ref<number>(30);
const scrollTop = ref<number>(0);
const nodePadding = ref<number>(20);

// Computed properties
const itemCount = computed(() => items.value.length);

const viewportHeight = computed(() => itemCount.value * rowHeight.value);

const startIndex = computed(() => {
  let startNode =
    Math.floor(scrollTop.value / rowHeight.value) - nodePadding.value;
  startNode = Math.max(0, startNode);
  return startNode;
});

const visibleNodeCount = computed(() => {
  let count =
    Math.ceil(rootHeight.value / rowHeight.value) + 2 * nodePadding.value;
  count = Math.min(itemCount.value - startIndex.value, count);
  return count;
});

const visibleItems = computed(() =>
  items.value.slice(startIndex.value, startIndex.value + visibleNodeCount.value)
);

const offsetY = computed(() => startIndex.value * rowHeight.value);

const spacerStyle = computed(() => ({
  transform: `translateY(${offsetY.value}px)`
}));

// Event handler
function handleScroll(event: Event) {
  scrollTop.value = (event.target as Element).scrollTop;
}

// Lifecycle hooks
onMounted(() => {
  const largestHeight = calculateInitialRowHeight();
  rowHeight.value = largestHeight !== undefined && largestHeight !== null ? largestHeight : 30;
  const options = passiveSupportMixin.methods.doesBrowserSupportPassiveScroll() ? { passive: true } : false;
  document.querySelector('.root')?.addEventListener('scroll', handleScroll, options);
});

onBeforeUnmount(() => {
  document.querySelector('.root')?.removeEventListener('scroll', handleScroll,);
});

// Utility function
function calculateInitialRowHeight(): number {
  const children = document.querySelectorAll(".spacer > .item") as NodeListOf<HTMLElement>;
  let largestHeight = 0;
  children.forEach((child: HTMLElement) => {
    if (child.offsetHeight > largestHeight) {
      largestHeight = child.offsetHeight;
    }
  });
  return largestHeight;
}
</script>

<style scoped>
.spacer {
  position: relative;
}

.item {
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  padding-left: 10px;
}
</style>