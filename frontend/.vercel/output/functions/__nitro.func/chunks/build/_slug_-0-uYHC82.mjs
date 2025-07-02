import { defineComponent, withAsyncContext, computed, resolveComponent, ref, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderVNode, ssrRenderList, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { c as useRoute, d as useHead, e as __nuxt_component_0$1 } from './server.mjs';
import { u as useAsyncData } from './asyncData-BeOWlB0K.mjs';
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
import 'perfect-debounce';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RevisionedBy",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if ((_a = _ctx.data) == null ? void 0 : _a.name) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-900" }, _attrs))}><p class="text-sm text-gray-700 dark:text-gray-300"> \u{1F6E0}\uFE0F <strong>Revisioned by:</strong><a${ssrRenderAttr("href", _ctx.data.url)} class="underline text-blue-600" target="_blank" rel="noopener">${ssrInterpolate(_ctx.data.name)}</a>`);
        if (_ctx.data.role) {
          _push(`<span> \u2014 ${ssrInterpolate(_ctx.data.role)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.data.org) {
          _push(`<span> (${ssrInterpolate(_ctx.data.org)})</span>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.data.date) {
          _push(`<span> \u2014 <em>${ssrInterpolate(new Date(_ctx.data.date).toLocaleDateString())}</em></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RevisionedBy.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FormulaBreakdown",
  __ssrInlineRender: true,
  props: {
    inputs: {},
    formula: {},
    result: {}
  },
  setup(__props) {
    const props = __props;
    const sampleKey = Object.keys(props.inputs)[0] || "input";
    const answer1 = ref("");
    const show1 = ref(false);
    const isCorrect1 = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 border-t pt-6" }, _attrs))}><h2 class="text-xl font-semibold mb-2">\u{1F50D} How the Formula Works</h2><div class="prose dark:prose-invert mb-4"><p>This result was computed using:</p><pre class="bg-gray-100 dark:bg-gray-900 p-3 rounded">${ssrInterpolate(_ctx.formula)}</pre><p>Here&#39;s how the inputs contributed:</p><ul><!--[-->`);
      ssrRenderList(_ctx.inputs, (value, key) => {
        _push(`<li><strong>${ssrInterpolate(key)}:</strong> ${ssrInterpolate(value)}</li>`);
      });
      _push(`<!--]--></ul></div><div class="mt-4"><h3 class="font-medium mb-2">\u{1F3AF} Quick Challenge</h3><div class="mb-3"><label class="block text-sm mb-1">If &quot;${ssrInterpolate(unref(sampleKey))}&quot; doubled, what happens to the result?</label><input${ssrRenderAttr("value", unref(answer1))} class="border px-2 py-1 rounded w-full">`);
      if (unref(show1)) {
        _push(`<p class="${ssrRenderClass([unref(isCorrect1) ? "text-green-600" : "text-red-600", "text-sm mt-1"])}">${ssrInterpolate(unref(isCorrect1) ? "\u2705 Correct!" : "\u274C Try again!")}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="bg-blue-600 text-white px-3 py-1 rounded">Check Answer</button></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FormulaBreakdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const route = useRoute();
    const { slug, lang } = route.params;
    const query = useRoute().query;
    const { buildCalculatorGraph, getRelatedCalculators } = ([__temp, __restore] = withAsyncContext(() => import('./seoGraph.server-99f5cfGN.mjs')), __temp = await __temp, __restore(), __temp);
    const { generateEmbedCode } = ([__temp, __restore] = withAsyncContext(() => import('./embedUtils-DEzLKLrN.mjs')), __temp = await __temp, __restore(), __temp);
    const { data: doc } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "doc",
      () => queryContent(`/${slug}.${lang}`).findOne()
    )), __temp = await __temp, __restore(), __temp);
    const componentName = computed(() => {
      try {
        return resolveComponent(slug);
      } catch (e) {
        return null;
      }
    });
    const graph = buildCalculatorGraph();
    const related = getRelatedCalculators(`${slug}.${lang}`, graph);
    const savedState = query.state ? JSON.parse(decodeURIComponent(query.state)) : {};
    const showEmbed = ref(false);
    const embedCode = generateEmbedCode(slug, lang, savedState);
    useHead({
      title: () => {
        var _a2;
        return ((_a2 = doc.value) == null ? void 0 : _a2.title) || "Calculator";
      },
      meta: [
        { name: "description", content: ((_a = doc.value) == null ? void 0 : _a.description) || "" },
        { property: "og:title", content: ((_b = doc.value) == null ? void 0 : _b.title) || "" },
        { property: "og:description", content: ((_c = doc.value) == null ? void 0 : _c.description) || "" },
        { name: "language", content: lang }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_RevisionedBy = _sfc_main$2;
      const _component_ContentRenderer = resolveComponent("ContentRenderer");
      const _component_FormulaBreakdown = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_RevisionedBy, {
        data: _ctx.frontmatter.revisionedBy
      }, null, _parent));
      _push(`<div class="calculator-page container mx-auto p-4"><h1 class="text-3xl font-bold mb-4">${ssrInterpolate(unref(doc).title)}</h1><p class="text-gray-600 mb-2">${ssrInterpolate(unref(doc).description)}</p>`);
      if (unref(componentName)) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(componentName)), { class: "my-6" }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ContentRenderer, {
        value: unref(doc),
        class: "prose dark:prose-invert mt-4"
      }, null, _parent));
      if (unref(doc).inputs && unref(doc).formula && unref(doc).result) {
        _push(ssrRenderComponent(_component_FormulaBreakdown, {
          inputs: unref(doc).inputs,
          formula: unref(doc).formula,
          result: unref(doc).result,
          class: "mt-10"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_a2 = unref(doc).related) == null ? void 0 : _a2.length) {
        _push(`<div class="mt-10 border-t pt-6"><h2 class="text-xl font-semibold mb-4">Related Calculators</h2><ul class="grid grid-cols-1 md:grid-cols-2 gap-2"><!--[-->`);
        ssrRenderList(unref(doc).related, (calc) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/${calc.language || unref(lang)}/${calc.slug.replace(/\.\w+$/, "")}`,
            class: "text-blue-600 hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(calc.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(calc.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="text-sm text-gray-500">${ssrInterpolate(calc.description)}</p></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(related).length) {
        _push(`<div class="mt-10 border-t pt-6"><h2 class="text-xl font-semibold mb-4">Related Calculators</h2><ul class="grid grid-cols-1 md:grid-cols-2 gap-2"><!--[-->`);
        ssrRenderList(unref(related), (calc) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/${calc.language}/${calc.slug.split(".")[0]}`,
            class: "text-blue-600 hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(calc.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(calc.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-10 border-t pt-6"><h2 class="text-xl font-semibold mb-4">Share or Embed This Calculator</h2><button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-4">${ssrInterpolate(unref(showEmbed) ? "Hide" : "Show")} Embed Code </button>`);
      if (unref(showEmbed)) {
        _push(`<div class="bg-gray-100 p-4 rounded border text-sm"><p class="mb-2">Embed this calculator on your website:</p><textarea class="w-full h-32 p-2 rounded border" readonly>${ssrInterpolate(unref(embedCode))}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[lang]/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-0-uYHC82.mjs.map
