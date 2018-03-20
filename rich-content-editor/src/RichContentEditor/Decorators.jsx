import decorateComponentWithProps from 'decorate-component-with-props';
import get from 'lodash/get';
import * as LinkDecorator from '../Decorators/LinkDecorator';
import * as HashtagDecorator from '../Decorators/HashtagDecorator';

const DecoratorList = [LinkDecorator.Name, HashtagDecorator.Name];

const defaultDecorators = {
  list: DecoratorList,
  config: {},
};

const createDecorators = ({ list, config } = defaultDecorators, theme, anchorTarget, relValue) => {
  const activeDecorators = [];
  list.forEach(decoratorName => {
    switch (decoratorName) {
      case LinkDecorator.Name: {
        const { Strategy: strategy, Component } = LinkDecorator;
        activeDecorators.push({
          strategy,
          component: decorateComponentWithProps(Component, { className: theme.link, anchorTarget, relValue }),
        });
        break;
      }
      case HashtagDecorator.Name: {
        const { Strategy: strategy, Component } = HashtagDecorator;
        const hashTagConfig = get(config, 'Hashtag', {});
        const hashtagTheme = {
          hashtag: theme && theme.hashtag,
          hashtag_hover: theme && theme.hashtag_hover, //eslint-disable-line camelcase
        };
        const hashtagProps = Object.assign({}, hashTagConfig, { theme: hashtagTheme });
        activeDecorators.push({
          strategy,
          component: decorateComponentWithProps(Component, hashtagProps),
        });
        break;
      }
      default:
        console.warn(`Failed to load uknown decorator "${decoratorName}"`); //eslint-disable-line no-console
        break;
    }
  });
  return activeDecorators;
};

export default createDecorators;
export { DecoratorList };
