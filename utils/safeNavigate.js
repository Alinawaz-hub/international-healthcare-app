import { useRouter } from "expo-router";
import { useRef } from "react";

export const useSafeNavigate = () => {
  const router = useRouter();
  const lastNavigationRef = useRef(null);

  const normalizeParams = (params) => {
    if (!params) return {};
    const result = {};
    for (const key in params) {
      result[key] = String(params[key]);
    }
    return result;
  };

  const buildUrl = (pathname, params) => {
    const query = new URLSearchParams(normalizeParams(params)).toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const safeNavigate = (input) => {
    const isString = typeof input === "string";
    const pathname = isString ? input : input.pathname;
    const params = isString ? {} : input.params;

    const finalUrl = buildUrl(pathname, params);

    // Prevent duplicate navigation
    if (lastNavigationRef.current === finalUrl) return;

    lastNavigationRef.current = finalUrl;

    setTimeout(() => {
      lastNavigationRef.current = null;
    }, 500); // debounce

    router.push(finalUrl); // 🔥 Always use final string URL
  };

  return safeNavigate;
};
