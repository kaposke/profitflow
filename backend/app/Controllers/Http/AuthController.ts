import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/Auth/LoginValidator';

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    const token = await auth.use('api').attempt(email.toLowerCase(), password);
    return token.toJSON();
  }
}
