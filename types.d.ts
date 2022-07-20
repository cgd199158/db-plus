declare module 'vue' {
  export interface GlobalComponents {
    Button: typeof import('db-plus')['DbButton'];
    Col: typeof import('db-plus')['DbCol'];
    Collapse: typeof import('db-plus')['DbCollapse'];
    CollapseItem: typeof import('db-plus')['DbCollapseItem'];
    CollapseTransition: typeof import('db-plus')['DbCollapseTransition'];
    Divider: typeof import('db-plus')['DbDivider'];
    Icon: typeof import('db-plus')['DbIcon'];
    Row: typeof import('db-plus')['DbRow'];
  }

  interface ComponentCustomProperties {}
}

export {};
