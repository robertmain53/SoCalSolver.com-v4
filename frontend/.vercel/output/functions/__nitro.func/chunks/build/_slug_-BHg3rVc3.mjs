import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { c as useRoute } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../_/paths.mjs';
import 'pinia';
import 'vue-router';
import 'markdown-it-container';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    const originalMd = ref("");
    const improvedMd = ref("");
    const statusMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-2xl font-bold mb-4">\u{1F4DD} Reviewing: ${ssrInterpolate(unref(slug))}</h1><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h2 class="font-semibold mb-2">\u{1F4C4} Original Markdown</h2><textarea class="w-full h-96 p-2 border rounded text-sm font-mono bg-white dark:bg-zinc-900" readonly>${ssrInterpolate(unref(originalMd))}</textarea></div><div><h2 class="font-semibold mb-2">\u2728 Improved Markdown</h2><textarea class="w-full h-96 p-2 border rounded text-sm font-mono bg-white dark:bg-zinc-900" readonly>${ssrInterpolate(unref(improvedMd))}</textarea></div></div><div class="flex gap-4 mt-6"><button class="px-4 py-2 bg-blue-600 text-white rounded">\u{1F916} Improve</button><button class="px-4 py-2 bg-green-600 text-white rounded">\u2705 Approve</button><button class="px-4 py-2 bg-purple-600 text-white rounded">\u{1F680} Publish</button></div>`);
      if (unref(statusMsg)) {
        _push(`<p class="mt-4 text-sm text-gray-500">${ssrInterpolate(unref(statusMsg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/calc/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-BHg3rVc3.mjs.map
