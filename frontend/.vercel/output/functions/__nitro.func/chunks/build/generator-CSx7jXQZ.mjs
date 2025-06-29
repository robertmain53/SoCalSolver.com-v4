import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "generator",
  __ssrInlineRender: true,
  setup(__props) {
    const slug = ref("");
    const lang = ref("en");
    const loading = ref(false);
    const success = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-2xl mx-auto" }, _attrs))}><h1 class="text-2xl font-bold mb-4">\u{1F9E0} AI Educational Content Generator</h1><form class="space-y-4"><div><label class="block font-medium mb-1">Slug</label><input${ssrRenderAttr("value", unref(slug))} class="border px-3 py-1 rounded w-full" placeholder="e.g. compound-interest" required></div><div><label class="block font-medium mb-1">Language</label><select class="border px-2 py-1 rounded w-full"><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(lang)) ? ssrLooseContain(unref(lang), "en") : ssrLooseEqual(unref(lang), "en")) ? " selected" : ""}>English</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(unref(lang)) ? ssrLooseContain(unref(lang), "es") : ssrLooseEqual(unref(lang), "es")) ? " selected" : ""}>Espa\xF1ol</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(unref(lang)) ? ssrLooseContain(unref(lang), "it") : ssrLooseEqual(unref(lang), "it")) ? " selected" : ""}>Italiano</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(unref(lang)) ? ssrLooseContain(unref(lang), "fr") : ssrLooseEqual(unref(lang), "fr")) ? " selected" : ""}>Fran\xE7ais</option></select></div><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Generating..." : "Generate Content")}</button></form>`);
      if (unref(success)) {
        _push(`<p class="text-green-600 mt-4">\u2705 Content injected successfully into ${ssrInterpolate(unref(slug))}.${ssrInterpolate(unref(lang))}.md</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<p class="text-red-600 mt-4">\u274C Failed to generate: ${ssrInterpolate(unref(error))}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/generator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=generator-CSx7jXQZ.mjs.map
