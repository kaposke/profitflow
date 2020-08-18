import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Trade from 'App/Models/Trade';
import TradeStoreValidator from 'App/Validators/Trade/TradeStoreValidator';

export default class TradesController {
  public async index ({ auth }: HttpContextContract) {
    const userId = auth.user!.id;
    const trades = await Trade.query().where('user_id', userId).orderBy('created_at', 'desc').exec();

    let tradesByDay: { date: string, trades: Trade[] }[] = [];
    trades.forEach(trade => {
      const date = trade.createdAt.toISODate()!;
      const day = tradesByDay.find(day => day.date === date);
      if (!day) {
        tradesByDay.push({ date, trades: [trade] });
      } else {
        day.trades.push(trade);
      }
    });

    return tradesByDay;
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
