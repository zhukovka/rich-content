
import createDecorators from './createDecorators';
import * as LinkDecorator from './LinkDecorator';
import * as HashtagDecorator from './HashtagDecorator';

const DecoratorList = [LinkDecorator.Name, HashtagDecorator.Name];

export default createDecorators;
export { DecoratorList };
