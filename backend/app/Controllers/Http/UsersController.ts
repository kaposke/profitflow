import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserStoreValidator from 'App/Validators/User/UserStoreValidator';
import UserUpdateValidator from 'App/Validators/User/UserUpdateValidator';

export default class UsersController {
  public async index () {
    return await User.all();
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(UserStoreValidator);
    const user = await User.create(data);
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
    user?.merge(data);
    await user?.save();
    return user;
  }

  public async destroy ({ auth }: HttpContextContract) {
    const { user } = auth;
    await user?.delete();
  }
}
