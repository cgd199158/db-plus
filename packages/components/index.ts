import { DbIcon } from './icon';
import { DbButton } from './button';
import { DbRow } from './row';
import { DbCol } from './col';
import { DbDivider } from './divider';
import { DbCollapse } from './collapse';
import { DbCollapseItem } from './collapse-item';

import { buildInstall } from './create';

const components = [DbIcon, DbButton, DbRow, DbCol, DbDivider, DbCollapse, DbCollapseItem];

export { buildInstall };
export const install = buildInstall(components);

export { DbIcon, DbButton, DbRow, DbCol, DbDivider, DbCollapse, DbCollapseItem };
