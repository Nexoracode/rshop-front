import localFont from "next/font/local";

/* export const doranFont = localFont({
  src: [{ path: "./DoranFaNum-VF.woff2" }],
  variable: "--font-doran",
}); */
export const doranFont = localFont({
  src: [
    { path: "./IRANSansWeb.woff", weight: "400", style: "normal" },
    { path: "./IRANSansWeb_Bold.woff", weight: "700", style: "normal" },
    { path: "./IRANSansWeb_Light.woff", weight: "300", style: "normal" },
    { path: "./IRANSansWeb_Medium.woff", weight: "500", style: "normal" },
    { path: "./IRANSansWeb_UltraLight.woff", weight: "200", style: "normal" },
  ],

  variable: "--font-doran",
});
