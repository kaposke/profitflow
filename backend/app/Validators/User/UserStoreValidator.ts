import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserStoreValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string({}, [
      rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      rules.alpha(),
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
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
  public messages = {
    'username.required': 'O nome de usuário é obrigatório',
    'username.unique': 'Este nome já está registrado',
    'email.required': 'O e-mail é obrigatório',
    'email.unique': 'Este e-mail já está registrado',
    'password.required': 'A senha é obrigatória',
    'password.minLength': 'A senha deve possuir pelo menos 8 caracteres',
    'password.confirmed': 'A confirmação de senha não coincide',
  };
  // public messages = {
  //   'username.required': 'Username is required',
  //   'username.unique': 'This username is already registered',
  //   'email.required': 'E-mail is required',
  //   'email.unique': 'This e-mail is already registered',
  //   'password.required': 'Password is required',
  //   'password.minLength': 'Password must be at least 8 characters',
  //   'password.confirmed': 'Password confirmation does not match',
  // };
}
