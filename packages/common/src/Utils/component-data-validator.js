import { Validator } from 'jsonschema';

const validator = new Validator();

export const validate = (componentData, schema) => {
  const result = validator.validate(componentData, schema);
  if (!result.valid) {
    throw result.errors[0];
  }
};
