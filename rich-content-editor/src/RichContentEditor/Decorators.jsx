import decorateComponentWithProps from 'decorate-component-with-props';
import * as LinkDecorator from '../Decorators/LinkDecorator';
import * as HashtagDecorator from '../Decorators/HashtagDecorator';

const DecoratorList = [LinkDecorator.Name, HashtagDecorator.Name];

const defaultDecorators = {
  list: DecoratorList,
  config: {},
};

const createDecorators = ({ list, config } = defaultDecorators, theme, anchorTarget) => {
  const activeDecorators = [];
  list.forEach(decoratorName => {
    switch (decoratorName) {
      case LinkDecorator.Name: {
        const { Strategy: strategy, Component } = LinkDecorator;
        activeDecorators.push({
          strategy,
          component: decorateComponentWithProps(Component, { className: theme.link, anchorTarget }),
        });
        break;
      }
      case HashtagDecorator.Name: {
        const { Strategy: strategy, Component } = HashtagDecorator;
        const hashtagTheme = {
          hashtag: theme && theme.hashtag,
          hashtag_hover: theme && theme.hashtag_hover, //eslint-disable-line camelcase
        };
        activeDecorators.push({
          strategy,
          component: decorateComponentWithProps(Component, { ...config.Hashtag, theme: hashtagTheme }),
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
