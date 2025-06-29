import { withAsyncContext, reactive, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { DiffMatchPatch } from 'diff-match-patch';
import { c as useRoute } from './server.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const dmp = new DiffMatchPatch();
    const route = useRoute();
    const slug = route.params.slug;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/admin/load-educational?slug=${slug}`, "$4lP3UhSaRY")), __temp = await __temp, __restore(), __temp);
    const original = {
      explain: ((_a = data.value) == null ? void 0 : _a.explain) || "",
      learn: ((_b = data.value) == null ? void 0 : _b.learn) || "",
      challenge: ((_c = data.value) == null ? void 0 : _c.challenge) || ""
    };
    const current = reactive({ ...original });
    const diffs = reactive({ explain: "", learn: "", challenge: "" });
    watch(current, () => {
      for (const section of ["explain", "learn", "challenge"]) {
        const diff = dmp.diff_main(original[section], current[section]);
        dmp.diff_cleanupSemantic(diff);
        diffs[section] = dmp.diff_prettyHtml(diff);
      }
    }, { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto p-6 space-y-8" }, _attrs))}><h1 class="text-2xl font-semibold">\u{1F4DD} Edit Educational Sections</h1><!--[-->`);
      ssrRenderList(["explain", "learn", "challenge"], (section) => {
        var _a2;
        _push(`<div><label class="block font-medium mb-1 capitalize">${ssrInterpolate(section)}</label><textarea rows="6" class="w-full p-2 border rounded mb-2">${ssrInterpolate(unref(current)[section])}</textarea><details class="bg-gray-50 border p-2 rounded"><summary class="cursor-pointer text-sm text-blue-600">\u{1F9FE} Show changes</summary><div class="prose mt-2">${(_a2 = unref(diffs)[section]) != null ? _a2 : ""}</div></details></div>`);
      });
      _push(`<!--]--><button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"> \u{1F4BE} Save &amp; Commit </button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/edit/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-U_Tj0cir.mjs.map
