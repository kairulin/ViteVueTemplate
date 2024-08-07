<template>
  <div ref="root" class="root" style="height: 400px; overflow: auto" @scroll="handleScroll">
    <div class="spacer" :style="spacerStyle">
      <div v-for="(item, index) in visibleItems" :key="index" class="item" :style="{ height: `${rowHeight}px` }">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
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
const items: Ref<Item[]> = ref(new Array(10000)
  .fill(null)
  .map((_, index) => ({ text: `Item ${index + 1}` }))
);

const rootHeight: Ref<number> = ref(400);
const rowHeight: Ref<number> = ref(30);
const scrollTop: Ref<number> = ref(0);
const nodePadding: Ref<number> = ref(20);

// Computed properties
const itemCount: Ref<number> = computed(() => items.value.length);

const startIndex: Ref<number> = computed(() => {
  let startNode =
    Math.floor(scrollTop.value / rowHeight.value) - nodePadding.value;
  startNode = Math.max(0, startNode);
  return startNode;
});

const visibleNodeCount: Ref<number> = computed(() => {
  let count =
    Math.ceil(rootHeight.value / rowHeight.value) + 2 * nodePadding.value;
  count = Math.min(itemCount.value - startIndex.value, count);
  return count;
});

const visibleItems: Ref<Item[]> = computed(() =>
  items.value.slice(startIndex.value, startIndex.value + visibleNodeCount.value)
);

const offsetY: Ref<number> = computed(() => startIndex.value * rowHeight.value);

const spacerStyle: Ref<{ transform: string }> = computed(() => ({
  transform: `translateY(${offsetY.value}px)`
}));

// Event handler
function handleScroll(event: Event) {
  scrollTop.value = (event.target as Element).scrollTop;
}

// Ref for the root element
const root: Ref<HTMLElement | null> = ref(null);

// Lifecycle hooks
onMounted(() => {
  const largestHeight = calculateInitialRowHeight();
  rowHeight.value = largestHeight !== undefined && largestHeight !== null ? largestHeight : 30;
  const options = passiveSupportMixin.methods.doesBrowserSupportPassiveScroll() ? { passive: true } : false;

  if (root.value) {
    root.value.addEventListener('scroll', handleScroll, options);
    // document.querySelector('.root')?.addEventListener('scroll', handleScroll, options);
  }
});

onBeforeUnmount(() => {
  if (root.value) {
    root.value.removeEventListener('scroll', handleScroll);
    // document.querySelector('.root')?.removeEventListener('scroll', handleScroll);
  }
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>