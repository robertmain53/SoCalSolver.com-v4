import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a as useI18n } from './server.mjs';
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

const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const form = ref({ name: "", email: "", message: "" });
    const status = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-12 px-4" }, _attrs))}><h1 class="text-3xl font-bold mb-4">${ssrInterpolate(unref(t)("contact.title"))}</h1><p class="mb-6 text-gray-700 dark:text-gray-300">${ssrInterpolate(unref(t)("contact.intro"))}</p><form class="space-y-4"><div><label class="block mb-1 font-semibold" for="name">${ssrInterpolate(unref(t)("contact.name"))}</label><input${ssrRenderAttr("value", form.value.name)} id="name" type="text" required class="w-full p-2 border rounded"></div><div><label class="block mb-1 font-semibold" for="email">${ssrInterpolate(unref(t)("contact.email"))}</label><input${ssrRenderAttr("value", form.value.email)} id="email" type="email" required class="w-full p-2 border rounded"></div><div><label class="block mb-1 font-semibold" for="message">${ssrInterpolate(unref(t)("contact.message"))}</label><textarea id="message" required class="w-full p-2 border rounded h-32">${ssrInterpolate(form.value.message)}</textarea></div><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">${ssrInterpolate(unref(t)("contact.send"))}</button>`);
      if (status.value) {
        _push(`<p class="mt-2 text-green-600">${ssrInterpolate(status.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form><div class="mt-8 text-sm text-gray-500 dark:text-gray-400"><p><strong>Email:</strong> info@socalsolver.com</p><p><strong>${ssrInterpolate(unref(t)("contact.address"))}:</strong> 123 Solver Ave, Los Angeles, CA</p></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-srU9qCE8.mjs.map
