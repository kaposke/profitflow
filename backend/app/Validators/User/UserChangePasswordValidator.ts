import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserChangePasswordValidator {
  constructor (private ctx: HttpContextContract) {
  }
  public schema = schema.create({
    token: schema.string(),
    password: schema.string({}, [
      rules.minLength(8),
      rules.confirmed(),
    ]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'password.required': 'A senha é obrigatória',
    'password.minLength': 'A senha deve possuir pelo menos 8 caracteres',
    'password.confirmed': 'A confirmação de senha não coincide',
  };
  // public messages = {
  //   'password.required': 'Password is required',
  //   'password.minLength': 'Password must be at least 8 characters',
  //   'password.confirmed': 'Password confirmation does not match',
  // };
}
