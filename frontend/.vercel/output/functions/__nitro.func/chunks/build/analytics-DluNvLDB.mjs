import { a as __nuxt_component_0$1 } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFetch } from './fetch-CJgBkAel.mjs';
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
import '@vue/shared';
import './asyncData-DvozhPju.mjs';
import 'perfect-debounce';

const _sfc_main = {
  __name: "analytics",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const { data: analytics } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/analytics/summary", "$QyvGpuh4HG")), __temp = await __temp, __restore(), __temp);
    const total = ((_a = analytics.value) == null ? void 0 : _a.total) || 0;
    const top = ((_b = analytics.value) == null ? void 0 : _b.top) || [];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto p-6 space-y-6" }, _attrs))}><h1 class="text-2xl font-semibold mb-4">\u{1F4CA} Analytics Dashboard</h1><div class="grid grid-cols-2 md:grid-cols-3 gap-4"><div class="border p-4 rounded-lg bg-white shadow"><div class="text-sm text-gray-500">Total Challenges Solved</div><div class="text-2xl font-bold mt-1">${ssrInterpolate(unref(total))}</div></div></div><h2 class="text-xl mt-6 mb-2 font-semibold">Top Calculators</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(unref(top), (item) => {
        _push(`<div class="border p-4 rounded-lg bg-white shadow">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/en/${item.slug}`,
          class: "text-blue-600 hover:underline font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.slug)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.slug), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="text-sm text-gray-500">${ssrInterpolate(item.count)} completions</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/analytics.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=analytics-DluNvLDB.mjs.map
