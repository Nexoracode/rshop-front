import localFont from "next/font/local";

/* export const doranFont = localFont({
  src: [{ path: "./DoranFaNum-VF.woff2" }],
  variable: "--font-doran",
}); */
export const doranFont = localFont({
  src: [
    { path: "./IRANSansWeb_Bold.woff", weight: "700" },
    { path: "./IRANSansWeb_Medium.woff", weight: "500" },
    { path: "./IRANSansWeb_Light.woff", weight: "300" },
    { path: "./IRANSansWeb_UltraLight.woff", weight: "200" },
  ],

  variable: "--font-iransans",
});

export const iranYekanFont = localFont({
  src: [
    { path: "./iranyekanwebregular.woff", weight: "400" },
    { path: "./iranyekanwebmedium.woff", weight: "500" },
    { path: "./iranyekanwebbold.woff", weight: "700" },
    { path: "./iranyekanwebextrabold.woff", weight: "800" },
  ],

  variable: "--font-iranyekan",
});
