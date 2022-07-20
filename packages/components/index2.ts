import { DbButton } from './button/index';
import { DbCol } from './col/index';
import { DbCollapse } from './collapse/index';
import { DbCollapseItem } from './collapse-item/index';
import { DbCollapseTransition } from './collapse-transition/index';
import { DbDivider } from './divider/index';
import { DbIcon } from './icon/index';
import { DbRow } from './row/index';

import { buildInstall } from './create';

// export type {
//   PropsOptions,
//   LocaleConfig,
//   LocaleNames,
//   LocaleOptions
// } from '@db-plus/config'

// export { version } from './version'

const components = [
  DbButton,
  DbCol,
  DbCollapse,
  DbCollapseItem,
  DbCollapseTransition,
  DbDivider,
  DbIcon,
  DbRow,
  // plugins
];

export { buildInstall };
export const install = buildInstall(components);

export { DbButton, Col, Collapse, CollapseItem, CollapseTransition, Divider, Icon, Row };
