import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserUpdateValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string.optional({}, [
      rules.alpha(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
    ]),
    email: schema.string.optional({}, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      rules.requiredIfExistsAny(['username', 'email']),
    ]),
    password: schema.string.optional({}, [
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
  public messages = {
    'username.unique': 'Este nome já está registrado',
    'email.unique': 'Este e-mail já está registrado',
    'password.minLength': 'A senha deve possuir pelo menos 8 caracteres',
    'password.confirmed': 'A confirmação de senha não coincide',
  };
}
