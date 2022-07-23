import type { ExtractPropTypes } from 'vue';

export const portalProps = {
  to: {
    type: String,
    default: '',
  },
};

export type PortalProps = ExtractPropTypes<typeof portalProps>;
