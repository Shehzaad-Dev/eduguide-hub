import { useEffect } from "react";
import DOMPurify from "dompurify";
import { adsConfig } from "@/lib/ads-config";

/** Injects RevBid site-verification markup from env (paste from publisher dashboard). */
export function RevBidHead() {
  useEffect(() => {
    if (!adsConfig.headHtml) return;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = DOMPurify.sanitize(adsConfig.headHtml, {
      ADD_TAGS: ["script", "meta", "link"],
      ADD_ATTR: ["async", "defer", "src", "content", "name", "rel", "href", "type"],
    });

    const nodes = Array.from(wrapper.childNodes);
    nodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const already =
        tag === "script"
          ? document.querySelector(`script[src="${(el as HTMLScriptElement).src}"]`)
          : tag === "meta"
            ? document.querySelector(`meta[name="${el.getAttribute("name")}"]`)
            : null;
      if (!already) document.head.appendChild(el.cloneNode(true));
    });
  }, []);

  return null;
}
