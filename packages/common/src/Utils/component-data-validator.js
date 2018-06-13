import { Validator } from 'jsonschema';

export default class ComponentDataValidator {
  constructor() {
    this.validator = new Validator();
  }

  validate(schema, componentData) {
    const result = this.validator.validate(componentData, schema);
    if (!result.valid) {
      throw result.errors[0];
    }
  }
}
