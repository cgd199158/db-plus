import { DbButton } from './button/index';
import { DbCol } from './col/index';
import { DbCollapse } from './collapse/index';
import { DbCollapseItem } from './collapse-item/index';
import { DbCollapseTransition } from './collapse-transition/index';
import { DbDivider } from './divider/index';
import { DbIcon } from './icon/index';
import { DbRow } from './row/index';
import { DbTooltip } from './tooltip/index';
import { DbDropDown } from './dropdown/index';
import { DbPortal } from './portal/index';
import { DbInput } from './input/index';

import { buildInstall } from './create';

export { version } from './version';

const components = [
  DbButton,
  DbCol,
  DbCollapse,
  DbCollapseItem,
  DbCollapseTransition,
  DbDivider,
  DbIcon,
  DbRow,
  DbTooltip,
  DbDropDown,
  DbPortal,
  DbInput,
  // plugins
];

export { buildInstall };
export const install = buildInstall(components);

export {
  DbButton,
  DbCol,
  DbCollapse,
  DbCollapseItem,
  DbCollapseTransition,
  DbDivider,
  DbIcon,
  DbRow,
  DbTooltip,
  DbDropDown,
  DbPortal,
  DbInput,
};
