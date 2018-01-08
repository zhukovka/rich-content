import decorateComponentWithProps from 'decorate-component-with-props';
import * as LinkDecorator from './Decorators/LinkDecorator';
import * as HashtagDecorator from './Decorators/HashtagDecorator';

const DecoratorList = [LinkDecorator.Name, HashtagDecorator.Name];

const defaultDecorators = {
  list: DecoratorList,
  config: {},
};

const createDecorators = ({ list, config } = defaultDecorators) => {
  const activeDecorators = [];
  list.forEach(decoratorName => {
    switch (decoratorName) {
      case LinkDecorator.Name:
        activeDecorators.push({
          strategy: LinkDecorator.Strategy,
          component: LinkDecorator.Component,
        });
        break;
      case HashtagDecorator.Name:
        activeDecorators.push({
          strategy: HashtagDecorator.Strategy,
          component: config.Hashtag ? decorateComponentWithProps(HashtagDecorator.Component, { ...config.Hashtag }) : HashtagDecorator.Component,
        });
        break;
      default:
        console.warn(`Failed to load uknown decorator "${decoratorName}"`); //eslint-disable-line no-console
        break;
    }
  });
  return activeDecorators;
};

export default createDecorators;
export { DecoratorList, HashtagDecorator };
