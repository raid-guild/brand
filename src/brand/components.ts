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
  accordion: "data-display-accordion--default",
  badge: "primitives-badge--default",
  breadcrumb: "navigation-breadcrumb--default",
  button: "primitives-button--default",
  calendar: "experimental-calendar--default",
  card: "data-display-card--default",
  carousel: "experimental-carousel--default",
  chart: "experimental-chart--default",
  checkbox: "primitives-checkbox--default",
  combobox: "experimental-combobox--default",
  command: "experimental-command--default",
  "data-table": "experimental-data-table--default",
  "date-picker": "experimental-date-picker--default",
  dialog: "overlays-dialog--default",
  drawer: "overlays-drawer--default",
  "dropdown-menu": "navigation-dropdown-menu--default",
  form: "experimental-form--default",
  "hover-card": "overlays-hover-card--default",
  input: "primitives-input--default",
  item: "data-display-item--default",
  kbd: "primitives-keyboard-key--default",
  label: "primitives-label--default",
  menubar: "navigation-menubar--default",
  multiselect: "experimental-multiselect--default",
  "navigation-menu": "navigation-navigation-menu--default",
  pagination: "navigation-pagination--default",
  popover: "overlays-popover--default",
  progress: "primitives-progress--default",
  "radio-group": "primitives-radio-group--default",
  "scroll-area": "data-display-scroll-area--default",
  select: "primitives-select--default",
  sheet: "overlays-sheet--default",
  sidebar: "experimental-sidebar--default",
  skeleton: "primitives-skeleton--default",
  slider: "primitives-slider--default",
  switch: "primitives-switch--default",
  table: "data-display-table--default",
  tabs: "navigation-tabs--default",
  textarea: "primitives-textarea--default",
  toggle: "primitives-toggle--default",
  tooltip: "overlays-tooltip--default",
  wizard: "experimental-wizard--default",
};

const additionalStoryIds: Partial<
  Record<(typeof componentIds)[number], readonly string[]>
> = {
  accordion: ["data-display-accordion--multiple"],
  breadcrumb: ["navigation-breadcrumb--collapsed"],
  calendar: [
    "experimental-calendar--selected",
    "experimental-calendar--range",
    "experimental-calendar--interaction",
  ],
  carousel: [
    "experimental-carousel--multiple-visible",
    "experimental-carousel--vertical",
    "experimental-carousel--interaction",
  ],
  card: ["data-display-card--with-action"],
  chart: ["experimental-chart--bar", "experimental-chart--pie"],
  combobox: [
    "experimental-combobox--selected",
    "experimental-combobox--interaction",
  ],
  command: [
    "experimental-command--empty-results",
    "experimental-command--dialog",
    "experimental-command--interaction",
    "experimental-command--dialog-interaction",
  ],
  "data-table": [
    "experimental-data-table--empty",
    "experimental-data-table--interaction",
  ],
  dialog: ["overlays-dialog--open", "overlays-dialog--interaction"],
  drawer: ["overlays-drawer--open", "overlays-drawer--interaction"],
  "dropdown-menu": ["navigation-dropdown-menu--open"],
  form: [
    "experimental-form--error",
    "experimental-form--submitting",
    "experimental-form--completed",
    "experimental-form--interaction",
  ],
  "hover-card": ["overlays-hover-card--open"],
  item: ["data-display-item--compact", "data-display-item--spacious"],
  "date-picker": [
    "experimental-date-picker--selected",
    "experimental-date-picker--disabled",
    "experimental-date-picker--interaction",
  ],
  multiselect: [
    "experimental-multiselect--selected",
    "experimental-multiselect--disabled",
    "experimental-multiselect--interaction",
  ],
  pagination: ["navigation-pagination--first-page"],
  "navigation-menu": [
    "navigation-navigation-menu--without-viewport",
    "navigation-navigation-menu--interaction",
  ],
  sheet: ["overlays-sheet--open", "overlays-sheet--interaction"],
  sidebar: ["experimental-sidebar--compact"],
  table: ["data-display-table--empty"],
  tabs: ["navigation-tabs--disabled"],
  tooltip: ["overlays-tooltip--open", "overlays-tooltip--right"],
  wizard: [
    "experimental-wizard--without-summary",
    "experimental-wizard--without-progress",
    "experimental-wizard--interaction",
    "experimental-wizard--validation",
  ],
};

export const COMPONENTS = componentIds.map((id) => ({
  id,
  sourcePath: `src/components/ui/${id}.tsx`,
  stability: experimentalComponents.has(id) ? "experimental" : "stable",
  dependencies: [],
  providers: [],
  storyIds: [
    ...(defaultStoryIds[id] ? [defaultStoryIds[id]] : []),
    ...(additionalStoryIds[id] ?? []),
  ],
  accessibilityExpected: !experimentalComponents.has(id),
  interactionTestExpected: interactionComponents.has(id),
}));
