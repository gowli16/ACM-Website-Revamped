import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRotateCw,
  FiPlus,
  FiX,
  FiHome,
  FiLock,
} from "react-icons/fi";
import { resolveRoute, routes } from "./routes";

let tabIdCounter = 1;
const nextTabId = () => `tab-${tabIdCounter++}`;

/**
 * Create a new tab object.
 */
function createTab(path = "/") {
  const route = resolveRoute(path);
  return {
    id: nextTabId(),
    path,
    title: route.title,
    favicon: route.favicon,
    history: [path],
    historyIndex: 0,
    scrollY: 0,
    componentKey: `${path}-${Date.now()}`,
  };
}

export default function BrowserShell() {
  const [tabs, setTabs] = useState(() => [createTab("/")]);
  const [activeTabId, setActiveTabId] = useState(() => tabs[0].id);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const activeRoute = resolveRoute(activeTab.path);

  // Scroll position memory per tab
  const scrollMemoryRef = useRef({});
  const contentRef = useRef(null);

  /* ----- Navigation ----- */

  const navigateTo = useCallback(
    (path) => {
      setTabs((prev) =>
        prev.map((tab) => {
          if (tab.id !== activeTabId) return tab;
          const route = resolveRoute(path);
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(path);
          return {
            ...tab,
            path,
            title: route.title,
            favicon: route.favicon,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            componentKey: `${path}-${Date.now()}`,
          };
        })
      );
    },
    [activeTabId]
  );

  const goBack = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTabId) return tab;
        if (tab.historyIndex <= 0) return tab;
        const newIndex = tab.historyIndex - 1;
        const path = tab.history[newIndex];
        const route = resolveRoute(path);
        return {
          ...tab,
          path,
          title: route.title,
          favicon: route.favicon,
          historyIndex: newIndex,
          componentKey: `${path}-${Date.now()}-back`,
        };
      })
    );
  }, [activeTabId]);

  const goForward = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTabId) return tab;
        if (tab.historyIndex >= tab.history.length - 1) return tab;
        const newIndex = tab.historyIndex + 1;
        const path = tab.history[newIndex];
        const route = resolveRoute(path);
        return {
          ...tab,
          path,
          title: route.title,
          favicon: route.favicon,
          historyIndex: newIndex,
          componentKey: `${path}-${Date.now()}-fwd`,
        };
      })
    );
  }, [activeTabId]);

  const refresh = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, componentKey: `${tab.path}-${Date.now()}-refresh` }
          : tab
      )
    );
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTabId]);

  /* ----- Tab management ----- */

  const openTab = useCallback((path) => {
    const route = resolveRoute(path);
    const newTab = createTab(path);
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const closeTab = useCallback(
    (tabId) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.id === tabId);
        if (idx === -1) return prev;
        if (prev.length === 1) {
          // Don't close the last tab — reset to home instead
          const homeTab = createTab("/");
          setActiveTabId(homeTab.id);
          return [homeTab];
        }
        const newTabs = prev.filter((t) => t.id !== tabId);
        if (tabId === activeTabId) {
          // Activate the previous tab (or the one before the closed one)
          const newActive = newTabs[Math.max(0, idx - 1)];
          setActiveTabId(newActive.id);
        }
        return newTabs;
      });
    },
    [activeTabId]
  );

  /* ----- Scroll memory ----- */

  const handleContentScroll = useCallback(
    (e) => {
      if (!e.target || e.target !== contentRef.current) return;
      scrollMemoryRef.current[activeTabId] = e.target.scrollTop;
    },
    [activeTabId]
  );

  // Restore scroll position when switching tabs
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = scrollMemoryRef.current[activeTabId] || 0;
    }
  }, [activeTabId]);

  /* ----- Address bar display ----- */

  const addressDisplay = (() => {
    const path = activeTab.path;
    if (path === "/") return { scheme: "acm://", display: "home", accent: "home" };
    const parts = path.split("/").filter(Boolean);
    return {
      scheme: "acm://",
      display: parts.join(" / "),
      accent: parts[0],
    };
  })();

  const canGoBack = activeTab.historyIndex > 0;
  const canGoForward = activeTab.historyIndex < activeTab.history.length - 1;

  /* ----- Render ----- */

  const ActiveComponent = activeRoute.component;

  return (
    <div className="browser-shell">
      {/* Browser Chrome */}
      <div className="browser-chrome">
        {/* Tab Bar */}
        <div className="browser-drag-region" />
        <div className="browser-tab-bar">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`browser-tab ${tab.id === activeTabId ? "active" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span className={`browser-tab-favicon ${tab.favicon}`}>
                {tab.favicon === "home" ? "A" : tab.title.charAt(0)}
              </span>
              <span className="browser-tab-title">{tab.title}</span>
              {tab.path !== "/" && (
                <span
                  className="browser-tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <FiX size={13} />
                </span>
              )}
            </div>
          ))}
          <div
            className="browser-new-tab"
            onClick={() => openTab("/")}
            title="New tab"
          >
            <FiPlus size={15} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="browser-toolbar">
          <button
            className="browser-nav-btn"
            onClick={goBack}
            disabled={!canGoBack}
            title="Back"
            aria-label="Back"
          >
            <FiArrowLeft size={17} />
          </button>
          <button
            className="browser-nav-btn"
            onClick={goForward}
            disabled={!canGoForward}
            title="Forward"
            aria-label="Forward"
          >
            <FiArrowRight size={17} />
          </button>
          <button
            className="browser-nav-btn"
            onClick={refresh}
            title="Refresh"
            aria-label="Refresh"
          >
            <FiRotateCw size={15} />
          </button>

          <div className="browser-address-bar">
            <FiLock size={12} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
            <span className="browser-address-scheme">{addressDisplay.scheme}</span>
            <span className="browser-address-path">
              <span className="browser-address-accent">{addressDisplay.accent}</span>
              {addressDisplay.display !== addressDisplay.accent && addressDisplay.display !== "home"
                ? addressDisplay.display.replace(addressDisplay.accent, "").trim()
                : addressDisplay.display === "home"
                ? "home"
                : ""}
            </span>
          </div>

          <div className="browser-toolbar-right">
            <button
              className="browser-nav-btn"
              onClick={() => {
                setActiveTabId(tabs[0].id);
                if (tabs[0].path !== "/") {
                  navigateTo("/");
                }
              }}
              title="Home"
              aria-label="Home"
            >
              <FiHome size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        className="browser-content"
        ref={contentRef}
        onScroll={handleContentScroll}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.componentKey}
            className="browser-tab-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ActiveComponent
              navigate={navigateTo}
              openTab={openTab}
              tabPath={activeTab.path}
              params={activeRoute.params}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
