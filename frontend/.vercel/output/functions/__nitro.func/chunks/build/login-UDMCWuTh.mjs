import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';

const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    login(email, password) {
      console.log("login", email, password);
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    useAuthStore();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))}><form><input${ssrRenderAttr("value", email.value)} type="email" placeholder="Email" required><input${ssrRenderAttr("value", password.value)} type="password" placeholder="Password" required><button type="submit">Login</button></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-UDMCWuTh.mjs.map
