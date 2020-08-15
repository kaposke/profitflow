import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserStoreValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string({}, [
      rules.alpha(),
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.confirmed(),
    ]),
  });

  public cacheKey = this.ctx.routeKey;

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
  */
  public messages = {};
}
