// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User';
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env';
import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';

export default class AccountVerificationController {
  public static sendVerificationEmail (user: User) {
    const token = jwt.sign({ id: user.id }, Env.get('TOKEN_SECRET') as string, {
      expiresIn: '2h',
    });

    const url = `${Env.get('FRONT_URL')}/verify?token=${token}`;

    Mail.sendLater(message => {
      message
        .from('proffitflow@gmail.com')
        .to(user.email)
        .subject(`Welcome to ProfitFlow, ${user.username}! Confirm your account.`)
        .htmlView('emails/welcome', { user, url });
    });

    return url;
  }

  public async verify ({ request, response, auth }: HttpContextContract) {
    const { token } = request.get();

    try {
      const decoded: any = jwt.verify(token, Env.get('TOKEN_SECRET') as string);

      const id = decoded.id;

      if (decoded.exp < new Date().getTime() / 1000) {
        return response.status(400).json({ message: 'Token expired.' });
      }

      const user = await User.findOrFail(id);
      user.merge({ confirmed: true });
      await user.save();

      const authToken = await auth.use('api').loginViaId(user.id);

      return {
        ...authToken.toJSON(),
        name: user.username,
        email: user.email,
        verified: user.confirmed,
      };
    } catch (ex) {
      return response.status(400);
    }
  }
}
