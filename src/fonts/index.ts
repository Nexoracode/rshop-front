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
    { path: "./iranyekanwebregular.woff", weight: "400", style: "normal" },
    { path: "./iranyekanwebmedium.woff", weight: "500", style: "normal" },
    { path: "./iranyekanwebbold.woff", weight: "700", style: "normal" },
    { path: "./iranyekanwebextrabold.woff", weight: "800", style: "normal" },
  ],

  variable: "--font-iranyekan",
});
