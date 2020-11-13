import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserStoreValidator from 'App/Validators/User/UserStoreValidator';
import UserUpdateValidator from 'App/Validators/User/UserUpdateValidator';
import AccountVerificationController from 'App/Controllers/Http/AccountVerificationController';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import jwt from 'jsonwebtoken';
import UserChangePasswordValidator from 'App/Validators/User/UserChangePasswordValidator';

export default class UsersController {
  public async index () {
    return await User.all();
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(UserStoreValidator);
    const user = await User.create({ ...data, email: data.email.toLowerCase() });
    AccountVerificationController.sendVerificationEmail(user);
    return user;
  }

  public async show ({ params }: HttpContextContract) {
    const { id } = params;
    const user = await User.findOrFail(id);
    return user;
  }

  public async update ({ request, auth }: HttpContextContract) {
    const data = await request.validate(UserUpdateValidator);
    const { user } = auth;
    user?.merge({ ...data, email: data.email?.toLowerCase() });
    await user?.save();
    return user;
  }

  public async destroy ({ auth }: HttpContextContract) {
    const { user } = auth;
    await user?.delete();
  }

  public async requestPasswordChange ({ request }: HttpContextContract) {
    const { email } = request.get();

    const user = await User.findByOrFail('email', email);

    const token = jwt.sign({ id: user.id }, Env.get('CHANGE_PASSWORD_TOKEN_SECRET') as string, {
      expiresIn: '2h',
    });

    const url = `${Env.get('FRONT_URL')}/change-password?token=${token}`;

    Mail.sendLater(message => {
      message
        .from(`ProfitFlow <${Env.get('MAIL_FROM')}>`)
        .to(user.email)
        .subject('[ProfitFlow] Forgot my password')
        .htmlView('emails/change-password.edge', { user, url });
    });
  }

  public async changePassword ({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(UserChangePasswordValidator);

    try {
      const decoded: any = jwt.verify(token, Env.get('CHANGE_PASSWORD_TOKEN_SECRET') as string);

      const id = decoded.id;

      if (decoded.exp < new Date().getTime() / 1000) {
        return response.status(403).json({ message: 'Token expired. Please request a new one.' });
      }

      const user = await User.findOrFail(id);
      user.merge({ password: password });
      await user.save();

      return response.status(201);
    } catch (ex) {
      return response.status(400);
    }
  }
}
