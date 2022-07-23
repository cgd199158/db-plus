import portal from './src/portal.vue';
import { withInstall } from '@db-plus/utils';

const DbPortal = withInstall(portal);

export { DbPortal };

export default DbPortal;
