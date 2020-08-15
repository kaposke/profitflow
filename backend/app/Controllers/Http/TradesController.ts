import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Trade from 'App/Models/Trade';
import TradeStoreValidator from 'App/Validators/Trade/TradeStoreValidator';

export default class TradesController {
  public async index ({ auth }: HttpContextContract) {
    const userId = auth.user!.id;
    const trades = await Trade.query().where('user_id', userId).orderBy('created_at');
    return trades;
  }

  public async store ({ request, auth }: HttpContextContract) {
    const data = await request.validate(TradeStoreValidator);
    const { user } = auth;
    const trade = await Trade.create({ ...data, userId: user?.id });
    return trade;
  }

  public async show ({ params, auth }: HttpContextContract) {
    const { id } = params;
    const userId = auth.user!.id;
    const trade = await Trade.query()
      .where('id', id)
      .where('user_id', userId)
      .firstOrFail();
    return trade;
  }

  public async update ({ request, params, auth }: HttpContextContract) {
    const data = await request.validate(TradeStoreValidator);
    const { id } = params;
    const userId = auth.user!.id;
    const trade = await Trade.query()
      .where('id', id)
      .where('user_id', userId)
      .firstOrFail();

    await trade.merge(data);
    await trade.save();
    return trade;
  }

  public async destroy ({ params, auth }: HttpContextContract) {
    const { id } = params;
    const userId = auth.user!.id;
    const trade = await Trade.query()
      .where('id', id)
      .where('user_id', userId)
      .firstOrFail();
    await trade.delete();
  }
}
