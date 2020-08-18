import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class LoginValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
    password: schema.string(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'email.required': 'E-mail is required',
    'email.exists': 'This e-mail is not registered',
    'password.required': 'Password is required',
  };
}
