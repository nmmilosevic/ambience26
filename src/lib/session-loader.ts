/** Shared session-loader contract — keep this file free of "use client". */

export const LOADER_STORAGE_KEY = "ambience-session-loaded";
export const LOADER_DONE_EVENT = "ambience:loader-done";

/**
 * Blocking inline script at the start of <body>, before the overlay markup.
 * Returning visitors and reduced-motion users get data-loader="done" so CSS
 * can hide the SSR overlay before first paint. First-session visits keep
 * data-loader="pending" and stay covered.
 */
export const LOADER_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(LOADER_STORAGE_KEY)};if(sessionStorage.getItem(k)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-loader","done")}else{document.documentElement.setAttribute("data-loader","pending")}}catch(e){document.documentElement.setAttribute("data-loader","done")}})();`;
