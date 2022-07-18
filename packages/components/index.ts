import { DbIcon } from './icon';
import { DbButton } from './button';
import { DbRow } from './row';
import { DbCol } from './col';
import { DbDivider } from './divider';

import { buildInstall } from './create';

const components = [DbIcon, DbButton, DbRow, DbCol, DbDivider];

export { buildInstall };
export const install = buildInstall(components);

export { DbIcon, DbButton, DbRow, DbCol, DbDivider };
