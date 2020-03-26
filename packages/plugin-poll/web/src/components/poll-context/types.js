import PropTypes from 'prop-types';

export const PollOptionPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
});

export const PollPropTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  settings: PropTypes.shape({
    multipleChoice: PropTypes.bool.isRequired,
    voteRole: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    secret: PropTypes.bool,
    viewRole: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(PollOptionPropTypes).isRequired,
};

export const PollActionsPropTypes = {
  changePollTitle: PropTypes.func,
  changePollImage: PropTypes.func,
  updatePollOption: PropTypes.func,
  addOption: PropTypes.func,
  removeOption: PropTypes.func,
};

export const PollContextPropTypes = {
  poll: PropTypes.shape({
    ...PollPropTypes,
    ...PollActionsPropTypes,
  }),
};
