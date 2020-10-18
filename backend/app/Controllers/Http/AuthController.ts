import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/Auth/LoginValidator';

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);
    const token = await auth.use('api').attempt(email.toLowerCase(), password);

    const user = await User.findByOrFail('email', email.toLowerCase());

    return {
      ...token.toJSON(),
      name: user.username,
      email: user.email,
      verified: user.confirmed,
    };
  }
}
