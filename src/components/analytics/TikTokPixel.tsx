import Script from "next/script";

/**
 * Pixel base de TikTok. No hace nada si no hay TIKTOK_PIXEL_ID configurado,
 * y no se monta hasta que el usuario da consentimiento explícito en el
 * banner de cookies (ver CookieConsentBanner).
 */
export function TikTokPixel({ enabled }: { enabled: boolean }) {
  const pixelId = process.env.TIKTOK_PIXEL_ID;
  if (!pixelId || !enabled) return null;

  return (
    <Script id="tiktok-pixel" strategy="afterInteractive">
      {`
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<e.methods.length;n++)ttq.setAndDefer(e,e.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('${pixelId}');
  ttq.page();
}(window, document, 'ttq');
      `}
    </Script>
  );
}
