import { DbIcon } from './icon';

import { buildInstall } from './create';

const components = [DbIcon];

export { buildInstall };
export const install = buildInstall(components);

export { DbIcon };
