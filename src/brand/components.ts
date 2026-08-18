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

const defaultStoryIds: Partial<Record<(typeof componentIds)[number], string>> = {
  badge: "primitives-badge--default",
  button: "primitives-button--default",
  checkbox: "primitives-checkbox--default",
  dialog: "overlays-dialog--default",
  input: "primitives-input--default",
  kbd: "primitives-keyboard-key--default",
  label: "primitives-label--default",
  progress: "primitives-progress--default",
  "radio-group": "primitives-radio-group--default",
  select: "primitives-select--default",
  skeleton: "primitives-skeleton--default",
  slider: "primitives-slider--default",
  switch: "primitives-switch--default",
  textarea: "primitives-textarea--default",
  toggle: "primitives-toggle--default",
};

export const COMPONENTS = componentIds.map((id) => ({
  id,
  sourcePath: `src/components/ui/${id}.tsx`,
  stability: experimentalComponents.has(id) ? "experimental" : "stable",
  dependencies: [],
  providers: [],
  storyIds: defaultStoryIds[id] ? [defaultStoryIds[id]] : [],
  accessibilityExpected: !experimentalComponents.has(id),
  interactionTestExpected: interactionComponents.has(id),
}));
