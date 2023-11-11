<template>
  <div class="code-display">
    <pre>
<span :style="keywordStyle">export</span> <span :style="keyword2Style">class</span> <span :style="identifierStyle">Example</span> <span :style="keyword2Style">implements</span> <span :style="identifierStyle">Parent</span> <span :style="punctuationStyle">{</span>
  <span :style="keyword2Style">public</span> <span :style="functionStyle">sort</span><span :style="punctuationStyle">&lt;</span><span :style="identifierStyle">T</span><span :style="punctuationStyle">&gt;(</span><span :style="valueStyle">data</span>: <span :style="identifierStyle">T</span><span :style="punctuationStyle">[]):</span> <span :style="identifierStyle">T</span><span :style="punctuationStyle">[] {</span>
    
    <span :style="keyword2Style">const</span> <span :style="identifier2Style">value1</span> = <span :style="functionStyle">true</span>;
    <span :style="keyword2Style">const</span> <span :style="identifier2Style">value2</span> = <span :style="functionStyle">42.0</span>;
    
    <span :style="keyword2Style">for</span> <span :style="punctuationStyle">(</span><span :style="keyword2Style">let</span> <span :style="identifier2Style">i</span> = <span :style="functionStyle">0</span>; <span :style="identifier2Style">i</span> &lt; <span :style="identifier2Style">data</span>.<span :style="identifier2Style">length</span> - <span :style="functionStyle">1</span>; <span :style="identifier2Style">i</span>++<span :style="punctuationStyle">) {</span>

      <span :style="darkStyle">// This is an example of a great comment adding the 'why' context</span>
      <span :style="keyword2Style">if</span> <span :style="punctuationStyle">(</span><span :style="identifier2Style">i</span> <span :style="punctuationStyle">&gt;</span> <span :style="functionStyle">0</span><span :style="punctuationStyle">) {</span>
        <span :style="functionStyle">swap</span>(<span :style="identifier2Style">data</span>, <span :style="identifier2Style">i</span>, <span :style="identifier2Style">i</span> + <span :style="identifier2Style">i</span><span :style="punctuationStyle">)</span>;
      <span :style="punctuationStyle">}</span>
    <span :style="punctuationStyle">}</span>

    <span :style="keyword2Style">return</span> <span :style="identifier2Style">data</span>;
  <span :style="punctuationStyle">}</span>
<span :style="punctuationStyle">}</span></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Theme } from '../lib/types';

const props = defineProps<{
  theme: Theme<any>
}>();

const keywordStyle = computed(() => {
  return `color: ${props.theme.primary.renderCss}`;
});

const keyword2Style = computed(() => {
  return `color: ${props.theme.secondary.renderCss}`;
});

const identifierStyle = computed(() => {
  return `color: ${props.theme.primaryAlt.renderCss}`;
});

const identifier2Style = computed(() => {
  return `color: ${props.theme.secondaryAlt.renderCss}`;
});

const functionStyle = computed(() => {
  return `color: ${props.theme.tertiary.renderCss}`;
});

const valueStyle = computed(() => {
  return `color: ${props.theme.quaternaryAlt.renderCss}`;
});

// const stringStyle = computed(() => {
//   return `color: ${props.theme.tertiaryAlt.renderCss}`;
// });

const punctuationStyle = computed(() => {
  return `color: ${props.theme.quaternary.renderCss}`;
});

// const backgroundStyle = computed(() => {

// });

const darkStyle = computed(() => {
  return `color: ${props.theme.dark.renderCss}`;
});

</script>

<style scoped></style>