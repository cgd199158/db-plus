import { DbIcon } from './icon';
import { DbButton } from './button';

import { buildInstall } from './create';

const components = [DbIcon, DbButton];

export { buildInstall };
export const install = buildInstall(components);

export { DbIcon, DbButton };
