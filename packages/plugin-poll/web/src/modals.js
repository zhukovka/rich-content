import { SettingsModal, CustomizeModal } from './components/settings';

const Modals = {
  POLL_SETTINGS: 'poll-settings',
  POLL_CUSTOMIZE: 'poll-customize',
};

const ModalsMap = {
  [Modals.POLL_SETTINGS]: SettingsModal,
  [Modals.POLL_CUSTOMIZE]: CustomizeModal,
};

export { Modals, ModalsMap };
