import PaywallComponent from './components/paywall-component';
import { PAYWALL_TYPE } from './constants';

const paywallRenderDescriptor = {
  component: PaywallComponent,
};

export const typeMapper = () => ({
  [PAYWALL_TYPE]: paywallRenderDescriptor,
});
