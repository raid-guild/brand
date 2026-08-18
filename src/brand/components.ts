const componentIds = [
  "accordion", "badge", "breadcrumb", "button", "calendar", "card",
  "carousel", "chart", "checkbox", "combobox", "command", "data-table",
  "date-picker", "dialog", "drawer", "dropdown-menu", "form", "hover-card",
  "input", "item", "kbd", "label", "menubar", "multiselect",
  "navigation-menu", "pagination", "popover", "progress", "radio-group",
  "scroll-area", "select", "sheet", "sidebar", "skeleton", "slider", "switch",
  "table", "tabs", "textarea", "toggle", "tooltip", "wizard",
] as const;

const experimentalComponents = new Set<string>([
  "calendar", "carousel", "chart", "combobox", "command", "data-table",
  "date-picker", "form", "multiselect", "sidebar", "wizard",
]);

const interactionComponents = new Set<string>([
  "calendar", "carousel", "combobox", "command", "data-table", "date-picker",
  "dialog", "drawer", "form", "multiselect", "navigation-menu", "sheet", "wizard",
]);

export const COMPONENTS = componentIds.map((id) => ({
  id,
  sourcePath: `src/components/ui/${id}.tsx`,
  stability: experimentalComponents.has(id) ? "experimental" : "stable",
  dependencies: [],
  providers: [],
  storyIds: [],
  accessibilityExpected: !experimentalComponents.has(id),
  interactionTestExpected: interactionComponents.has(id),
}));
