import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-D9EThXdG.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import 'requrl';
import 'markdown-it-container';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@vue/shared';
import './asyncData-BeOWlB0K.mjs';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "feedback",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: feedback } = ([__temp, __restore] = withAsyncContext(() => useFetch("/logs/feedback.json", "$_S2KwP-0Kn")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-4xl mx-auto" }, _attrs))}><h1 class="text-2xl font-bold mb-4">\u{1F4DD} User Feedback</h1>`);
      if ((_a = unref(feedback)) == null ? void 0 : _a.length) {
        _push(`<div><!--[-->`);
        ssrRenderList(unref(feedback), (entry, index) => {
          _push(`<div class="border rounded-lg p-4 mb-3 bg-white dark:bg-gray-800"><p class="text-sm text-gray-500">\u{1F552} ${ssrInterpolate(new Date(entry.time).toLocaleString())} | ${ssrInterpolate(entry.lang)}/${ssrInterpolate(entry.slug)}</p><p class="mb-1">\u2B50 <strong>${ssrInterpolate(entry.rating)}</strong> / 5</p>`);
          if (entry.comment) {
            _push(`<p class="text-gray-700 dark:text-gray-300">\u{1F4AC} ${ssrInterpolate(entry.comment)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-red-500">No feedback available.</p>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/feedback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=feedback-BYWLMyt1.mjs.map
