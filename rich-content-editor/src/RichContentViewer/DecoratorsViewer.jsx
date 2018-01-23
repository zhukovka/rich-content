import decorateComponentWithProps from 'decorate-component-with-props';
import * as HashtagDecorator from '../Decorators/HashtagDecorator';

const DecoratorList = [HashtagDecorator.Name];

const defaultDecorators = {
  list: DecoratorList,
  config: {},
};

const createDecorators = ({ list, config } = defaultDecorators) => {
  const activeDecorators = [];
  list.forEach(decoratorName => {
    switch (decoratorName) {
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
