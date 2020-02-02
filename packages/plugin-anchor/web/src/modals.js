import AnchorModal from './toolbar/AnchorModal';

const Modals = {
  ANCHOR_SETTINGS: 'anchor-settings',
};

const ModalsMap = {
  [Modals.ANCHOR_SETTINGS]: AnchorModal,
};

export { Modals, ModalsMap };
