/**
 * Central registry of all navigable routes in the ACM browser.
 * Each entry maps an internal path to a content component + metadata.
 *
 * The BrowserShell uses this to:
 * - know which tabs can be opened
 * - render the correct content for each tab
 * - display titles/favicons in the tab bar and address bar
 */

import Home from "../components/tab-content/Home";
import EventsTunnel from "../components/tab-content/EventsTunnel";
import Achievements from "../components/tab-content/Achievements";
import Core from "../components/tab-content/Core";
import Alumni from "../components/tab-content/Alumni";
import Faculty from "../components/tab-content/Faculty";
import Projects from "../components/tab-content/Projects";
import Goals from "../components/tab-content/Goals";
import Testimonials from "../components/tab-content/Testimonials";
import BridgeCourse from "../components/tab-content/BridgeCourse";
import SigPage from "../components/tab-content/SigPage";
import About from "../components/tab-content/About";

export const routes = {
  "/": {
    title: "Home",
    favicon: "home",
    component: Home,
    closable: false,
  },
  "/sigs": {
    title: "SIGs",
    favicon: "sig",
    component: SigPage,
    closable: true,
  },
  "/sigs/ai": {
    title: "SIG — AI",
    favicon: "sig",
    component: SigPage,
    closable: true,
    params: { sig: "ai" },
  },
  "/sigs/web": {
    title: "SIG — Web & App",
    favicon: "sig",
    component: SigPage,
    closable: true,
    params: { sig: "web" },
  },
  "/sigs/cyber": {
    title: "SIG — Cybersecurity",
    favicon: "sig",
    component: SigPage,
    closable: true,
    params: { sig: "cyber" },
  },
  "/sigs/glitch": {
    title: "SIG — Glitch",
    favicon: "sig",
    component: SigPage,
    closable: true,
    params: { sig: "glitch" },
  },
  "/events": {
    title: "Events",
    favicon: "events",
    component: EventsTunnel,
    closable: true,
  },
  "/achievements": {
    title: "Achievements",
    favicon: "about",
    component: Achievements,
    closable: true,
  },
  "/core": {
    title: "Core Committee",
    favicon: "team",
    component: Core,
    closable: true,
  },
  "/alumni": {
    title: "Alumni",
    favicon: "team",
    component: Alumni,
    closable: true,
  },
  "/faculty": {
    title: "Faculty",
    favicon: "team",
    component: Faculty,
    closable: true,
  },
  "/projects": {
    title: "Projects",
    favicon: "projects",
    component: Projects,
    closable: true,
  },
  "/goals": {
    title: "Goals",
    favicon: "about",
    component: Goals,
    closable: true,
  },
  "/testimonials": {
    title: "Testimonials",
    favicon: "about",
    component: Testimonials,
    closable: true,
  },
  "/bridge_course": {
    title: "Bridge Course",
    favicon: "recruit",
    component: BridgeCourse,
    closable: true,
  },
  "/about": {
    title: "About",
    favicon: "about",
    component: About,
    closable: true,
  },
};

/**
 * Resolve a path to a route entry, falling back gracefully.
 * This handles dynamic-ish paths like /sigs/ai that have explicit entries.
 */
export function resolveRoute(path) {
  if (routes[path]) return { ...routes[path], path };

  // Try /sigs/[sig] pattern
  if (path.startsWith("/sigs/")) {
    const sig = path.replace("/sigs/", "");
    const entry = routes[`/sigs/${sig}`];
    if (entry) return { ...entry, path };
    // generic sigs route
    return { ...routes["/sigs"], path, params: { sig } };
  }

  // Fallback to about for unknown routes
  return { ...routes["/about"], path };
}
