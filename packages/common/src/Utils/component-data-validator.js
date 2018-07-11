import { Validator } from 'jsonschema';

const validator = new Validator();

export const validate = (componentData, schema) => {
  const result = validator.validate(componentData, schema);
  if (!result.valid && result.errors) {
    result.errors.forEach(error => console.warn('Plugin schema validation error:', error)); // eslint-disable-line no-console
  }
};
