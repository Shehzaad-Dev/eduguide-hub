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
const MAX_SEQUENTIAL_REFRESHES = 6;
const ENGAGEMENT_EVENTS = ["mousemove", "scroll", "touchstart"] as const;

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

const SMART_LINK_URL =
  "https://www.effectivecpmnetwork.com/pn466aiwkn?key=1ca04b32e719df4207d5b03e53f0709c";

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

function createSlotManager(config: AdConfig, globalState: { pageVisible: boolean; sequentialRefreshes: number; engaged: boolean }) {
  const container = document.getElementById(config.id);
  if (!container) return null;

  let timerId: number | null = null;
  let slotVisible = false;
  let hasLoaded = false;

  const clearTimer = () => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  };

  const canAutoRefresh = () =>
    slotVisible && globalState.pageVisible && globalState.sequentialRefreshes < MAX_SEQUENTIAL_REFRESHES;

  const loadSlot = () => {
    if (!canAutoRefresh()) return;

    if (config.provider === "adsterra") {
      injectAdsterra(container, config);
    } else {
      injectEffectiveCpm(container, config);
    }

    globalState.sequentialRefreshes += 1;
    hasLoaded = true;
  };

  const scheduleNextRefresh = () => {
    clearTimer();
    if (!canAutoRefresh()) return;

    timerId = window.setTimeout(() => {
      timerId = null;
      if (!canAutoRefresh()) return;
      loadSlot();
      scheduleNextRefresh();
    }, REFRESH_INTERVAL_MS);
  };

  const updateRefreshState = () => {
    if (!canAutoRefresh()) {
      clearTimer();
      return;
    }

    if (!hasLoaded) {
      loadSlot();
    }

    if (timerId === null) {
      scheduleNextRefresh();
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((item) => item.target === container);
      if (!entry) return;
      slotVisible = entry.intersectionRatio >= 0.5;
      updateRefreshState();
    },
    { threshold: [0.5] },
  );

  observer.observe(container);
  return {
    updateRefreshState,
    clear: () => {
      clearTimer();
      observer.disconnect();
    },
  };
}

export function AdsterraAutoRefreshBanners() {
  useEffect(() => {
    const globalState = {
      pageVisible: !document.hidden,
      sequentialRefreshes: 0,
      engaged: false,
    };

    const managers = adConfigs
      .map((config) => createSlotManager(config, globalState))
      .filter((manager): manager is { updateRefreshState: () => void; clear: () => void } => Boolean(manager));

    const handleVisibilityChange = () => {
      globalState.pageVisible = !document.hidden;
      managers.forEach((manager) => manager.updateRefreshState());
    };

    const handleEngagement = () => {
      globalState.engaged = true;
      globalState.sequentialRefreshes = 0;
      managers.forEach((manager) => manager.updateRefreshState());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    ENGAGEMENT_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, handleEngagement, { passive: true });
    });

    managers.forEach((manager) => manager.updateRefreshState());

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ENGAGEMENT_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, handleEngagement);
      });
      managers.forEach((manager) => manager.clear());
    };
  }, []);

  return (
    <section className="border-b border-border bg-soft" aria-label="Top homepage ads">
      <div className="container-px mx-auto max-w-7xl py-4 grid gap-4">
        <div className="grid gap-4 lg:grid-cols-[1.6fr,1fr] items-start">
          <div className="grid gap-4">
            <div
              id="adsterra-728x90-banner"
              className="overflow-hidden rounded-xl"
              style={{ minHeight: "90px" }}
              aria-label="Adsterra 728x90 leaderboard ad"
            />

            <div className="grid gap-4 lg:grid-cols-[1fr,0.65fr]">
              <div
                id="adsterra-468x60-banner"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "60px" }}
                aria-label="Adsterra 468x60 banner"
              />
              <div
                id="ecpm-665391dd4f2164b4ccf56626f8253562"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "90px" }}
                aria-label="Effective CPM network banner"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <div
                id="adsterra-320x50-banner"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "50px" }}
                aria-label="Adsterra 320x50 mobile banner"
              />
              <div
                id="adsterra-160x300-banner"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "300px" }}
                aria-label="Adsterra 160x300 skyscraper"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2 items-stretch">
              <div
                id="adsterra-300x250-banner"
                className="overflow-hidden rounded-xl"
                style={{ minHeight: "250px" }}
                aria-label="Adsterra 300x250 rectangle ad"
              />
              <div className="grid gap-4">
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
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr,0.9fr] items-start">
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-3">
              Smart Link Placement
            </div>
            <h2 className="text-xl font-semibold text-secondary mb-3">
              High-converting effective CPM smart link
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Click the button below to route traffic through the smart link. This link is placed here to maximize exposure alongside the top homepage ads.
            </p>
            <a
              href={SMART_LINK_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              Open Smart Link Offer
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-3">
              Publisher Optimization
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              New banner scripts and the smart link are now loaded together in one compact top homepage panel to reduce wasted spacing and improve ad density.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
