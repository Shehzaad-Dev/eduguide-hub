import { useEffect } from "react";

type AdProvider = "adsterra" | "effectivecpm";

type AdConfig = {
  id: string;
  label: string;
  width: number;
  height: number;
  provider: AdProvider;
  key?: string;
  invokeUrl: string;
  containerId?: string;
};

const REFRESH_INTERVAL_MS = 30_000;
const ADSTERRA_INJECTION_STAGGER_MS = 250;

const adConfigs: AdConfig[] = [
  {
    id: "adsterra-728x90-banner",
    label: "Adsterra 728x90 leaderboard",
    width: 728,
    height: 90,
    provider: "adsterra",
    key: "8a23a3293f12f7d8df1b0ddfd780070d",
    invokeUrl:
      "https://www.highperformanceformat.com/8a23a3293f12f7d8df1b0ddfd780070d/invoke.js",
  },
  {
    id: "adsterra-300x250-banner",
    label: "Adsterra 300x250 medium rectangle",
    width: 300,
    height: 250,
    provider: "adsterra",
    key: "16ea2b2254d9d0a54edaf811908d57fa",
    invokeUrl:
      "https://www.highperformanceformat.com/16ea2b2254d9d0a54edaf811908d57fa/invoke.js",
  },
  {
    id: "adsterra-468x60-banner",
    label: "Adsterra 468x60 banner",
    width: 468,
    height: 60,
    provider: "adsterra",
    key: "b221422c5d6f7471a7347865ff26cc0d",
    invokeUrl:
      "https://www.highperformanceformat.com/b221422c5d6f7471a7347865ff26cc0d/invoke.js",
  },
  {
    id: "adsterra-160x300-banner",
    label: "Adsterra 160x300 skyscraper",
    width: 160,
    height: 300,
    provider: "adsterra",
    key: "cc9a5ce72aede7b3212d37529a6e12a7",
    invokeUrl:
      "https://www.highperformanceformat.com/cc9a5ce72aede7b3212d37529a6e12a7/invoke.js",
  },
  {
    id: "adsterra-320x50-banner",
    label: "Adsterra 320x50 mobile banner",
    width: 320,
    height: 50,
    provider: "adsterra",
    key: "6a3d74765ba7b3ca957314a241ef3aa1",
    invokeUrl:
      "https://www.highperformanceformat.com/6a3d74765ba7b3ca957314a241ef3aa1/invoke.js",
  },
  {
    id: "adsterra-160x600-banner",
    label: "Adsterra 160x600 wide skyscraper",
    width: 160,
    height: 600,
    provider: "adsterra",
    key: "2c048d071be4697b86112ff8581145da",
    invokeUrl:
      "https://www.highperformanceformat.com/2c048d071be4697b86112ff8581145da/invoke.js",
  },
  {
    id: "ecpm-665391dd4f2164b4ccf56626f8253562",
    label: "Effective CPM network banner",
    width: 728,
    height: 90,
    provider: "effectivecpm",
    invokeUrl:
      "https://pl29566457.effectivecpmnetwork.com/665391dd4f2164b4ccf56626f8253562/invoke.js",
    containerId: "container-665391dd4f2164b4ccf56626f8253562",
  },
  {
    id: "ecpm-popender",
    label: "Effective CPM Popender",
    width: 300,
    height: 50,
    provider: "effectivecpm",
    invokeUrl:
      "https://pl29567850.effectivecpmnetwork.com/72/66/d2/7266d2c28899f6cdf4f1d90328e30406.js",
    containerId: "container-ecpm-popender",
  },
  {
    id: "ecpm-socialbar",
    label: "Effective CPM Social Bar",
    width: 300,
    height: 50,
    provider: "effectivecpm",
    invokeUrl:
      "https://pl29567851.effectivecpmnetwork.com/7d/dc/32/7ddc32cb4db96d99536f0554c15a2e09.js",
    containerId: "container-ecpm-socialbar",
  },
];

function buildAtOptionsScript(config: AdConfig) {
  return `window.atOptions = {
  key: '${config.key}',
  format: 'iframe',
  height: ${config.height},
  width: ${config.width},
  params: {}
};`;
}

function injectAdsterra(container: HTMLElement, config: AdConfig) {
  container.replaceChildren();

  const optionsScript = document.createElement("script");
  optionsScript.type = "text/javascript";
  optionsScript.text = buildAtOptionsScript(config);

  const invokeScript = document.createElement("script");
  invokeScript.src = config.invokeUrl;
  invokeScript.async = false;
  invokeScript.setAttribute("data-cfasync", "false");

  container.append(optionsScript, invokeScript);
}

function injectEffectiveCpm(container: HTMLElement, config: AdConfig) {
  container.replaceChildren();

  const slot = document.createElement("div");
  slot.id = config.containerId ?? config.id;
  slot.style.width = "100%";
  slot.style.height = "100%";

  const invokeScript = document.createElement("script");
  invokeScript.async = true;
  invokeScript.setAttribute("data-cfasync", "false");
  invokeScript.src = config.invokeUrl;

  container.append(slot, invokeScript);
}

function loadConfig(config: AdConfig) {
  const container = document.getElementById(config.id);
  if (!container) return;

  if (config.provider === "adsterra") {
    injectAdsterra(container, config);
  } else {
    injectEffectiveCpm(container, config);
  }
}

function loadAllSlots() {
  // Adsterra relies on a shared global `window.atOptions`; stagger execution
  // to prevent placement collisions when multiple slots load together.
  const adsterraConfigs = adConfigs.filter((config) => config.provider === "adsterra");
  const effectiveCpmConfigs = adConfigs.filter((config) => config.provider === "effectivecpm");

  effectiveCpmConfigs.forEach((config) => loadConfig(config));
  adsterraConfigs.forEach((config, index) => {
    window.setTimeout(() => loadConfig(config), index * ADSTERRA_INJECTION_STAGGER_MS);
  });
}

export function AdsterraAutoRefreshBanners() {
  useEffect(() => {
    // Immediate first load + strict 30s refresh cycle.
    loadAllSlots();
    const intervalId = window.setInterval(loadAllSlots, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="border-b border-border bg-soft/70" aria-label="Top site ads">
      <div className="container-px mx-auto max-w-7xl py-3 grid gap-3">
        <div className="grid gap-3 xl:grid-cols-[160px,minmax(0,1fr),160px] items-start">
          <aside className="hidden xl:grid gap-3 justify-items-center">
            <div
              id="adsterra-160x300-banner"
              className="overflow-hidden rounded-xl"
              style={{ minHeight: "300px", width: "160px" }}
              aria-label="Adsterra 160x300 skyscraper"
            />
          </aside>

          <div className="grid gap-3 min-w-0">
            <div
              id="adsterra-728x90-banner"
              className="overflow-hidden rounded-xl"
              style={{ minHeight: "90px" }}
              aria-label="Adsterra 728x90 leaderboard ad"
            />
            <div
              id="ecpm-665391dd4f2164b4ccf56626f8253562"
              className="overflow-hidden rounded-xl"
              style={{ minHeight: "90px" }}
              aria-label="Effective CPM network banner"
            />
            <div className="grid gap-3 lg:grid-cols-[1fr,320px] items-start">
              <div
                id="adsterra-468x60-banner"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "60px" }}
                aria-label="Adsterra 468x60 banner"
              />
              <div
                id="adsterra-320x50-banner"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "50px", width: "320px", maxWidth: "100%" }}
                aria-label="Adsterra 320x50 mobile banner"
              />
            </div>

            <div
              id="adsterra-300x250-banner"
              className="overflow-hidden rounded-xl"
              style={{ minHeight: "250px" }}
              aria-label="Adsterra 300x250 rectangle ad"
            />
          </div>

          <aside className="hidden xl:grid gap-3 justify-items-center">
            <div
              id="adsterra-160x600-banner"
              className="overflow-hidden rounded-xl"
              style={{ minHeight: "600px", width: "160px" }}
              aria-label="Adsterra 160x600 wide skyscraper"
            />
          </aside>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div
            id="ecpm-popender"
            className="overflow-hidden rounded-xl"
            style={{ minHeight: "80px" }}
            aria-label="Effective CPM popender script"
          />
          <div
            id="ecpm-socialbar"
            className="overflow-hidden rounded-xl"
            style={{ minHeight: "80px" }}
            aria-label="Effective CPM social bar script"
          />
        </div>
      </div>
    </section>
  );
}
