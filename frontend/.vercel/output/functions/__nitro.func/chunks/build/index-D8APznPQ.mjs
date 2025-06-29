import { a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const calculators = ([__temp, __restore] = withAsyncContext(() => $fetch("/api/admin/list")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-3xl font-bold mb-4">\u{1F9E0} Admin Dashboard</h1><p class="text-gray-600 mb-6">Manage drafts, reviews, approvals, and publishing of calculators.</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(unref(calculators), (calc) => {
        _push(`<div class="border rounded-xl p-4 bg-white dark:bg-zinc-900 shadow"><h2 class="font-semibold text-lg">${ssrInterpolate(calc.title)}</h2><p class="text-sm text-gray-500 mb-2">${ssrInterpolate(calc.slug)}</p><p class="text-xs text-yellow-600 mb-4">${ssrInterpolate(calc.status)}</p><div class="flex flex-wrap gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/calc/${calc.slug}`,
          class: "text-blue-600 hover:underline text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u{1F4DD} Review`);
            } else {
              return [
                createTextVNode("\u{1F4DD} Review")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/logs/${calc.slug}`,
          class: "text-blue-600 hover:underline text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u{1F4DC} Logs`);
            } else {
              return [
                createTextVNode("\u{1F4DC} Logs")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D8APznPQ.mjs.map
