import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "translations",
  __ssrInlineRender: true,
  setup(__props) {
    const locales = ["en", "fr", "es", "it", "ko", "zh"];
    const selectedLocale = ref("en");
    const translations = ref(null);
    const editable = ref({});
    const statusMsg = ref("");
    const validJson = ref(true);
    const search = ref("");
    const filteredTranslations = computed(() => {
      if (!translations.value) return {};
      if (!search.value) return editable.value;
      const s = search.value.toLowerCase();
      return Object.fromEntries(
        Object.entries(editable.value).filter(([k, v]) => k.toLowerCase().includes(s) || v.toLowerCase().includes(s))
      );
    });
    async function loadTranslations(locale) {
      try {
        const res = await fetch(`/i18n/locales/${locale}.json`);
        const data = await res.json();
        translations.value = data;
        editable.value = { ...data };
        statusMsg.value = "";
        validJson.value = true;
      } catch (e) {
        statusMsg.value = "Failed to load translations.";
        validJson.value = false;
      }
    }
    watch(selectedLocale, loadTranslations);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-2xl font-bold mb-4">\u{1F310} Translation Manager</h1><select class="mb-4 p-2 border rounded"><!--[-->`);
      ssrRenderList(locales, (locale) => {
        _push(`<option${ssrRenderAttr("value", locale)}${ssrIncludeBooleanAttr(Array.isArray(selectedLocale.value) ? ssrLooseContain(selectedLocale.value, locale) : ssrLooseEqual(selectedLocale.value, locale)) ? " selected" : ""}>${ssrInterpolate(locale)}</option>`);
      });
      _push(`<!--]--></select><input${ssrRenderAttr("value", search.value)} placeholder="Search key..." class="mb-4 p-2 border rounded w-full">`);
      if (translations.value) {
        _push(`<div><div class="mb-4 max-h-96 overflow-y-auto border rounded bg-white dark:bg-zinc-900"><!--[-->`);
        ssrRenderList(filteredTranslations.value, (value, key) => {
          _push(`<div class="flex items-center border-b last:border-b-0 p-2"><span class="w-1/3 font-mono text-xs text-gray-600">${ssrInterpolate(key)}</span><input${ssrRenderAttr("value", editable.value[key])} class="w-2/3 p-1 border rounded text-xs font-mono"></div>`);
        });
        _push(`<!--]--></div><button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">\u{1F4BE} Save</button>`);
        if (statusMsg.value) {
          _push(`<p class="${ssrRenderClass([{ "text-green-600": validJson.value, "text-red-600": !validJson.value }, "mt-2 text-sm"])}">${ssrInterpolate(statusMsg.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/translations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=translations-Bbm0-w59.mjs.map
