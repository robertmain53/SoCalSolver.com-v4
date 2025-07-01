import { ab as joinRelativeURL, a as useRuntimeConfig } from '../nitro/nitro.mjs';

function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

export { baseURL as a, buildAssetsURL as b, publicAssetsURL as p };
//# sourceMappingURL=paths.mjs.map
