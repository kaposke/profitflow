import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Trade from 'App/Models/Trade';
import TradeStoreValidator from 'App/Validators/Trade/TradeStoreValidator';

export default class TradesController {
  public async index ({ request, auth }: HttpContextContract) {
    const { page, perPage } = request.get();
    const userId = auth.user!.id;
    const paginatedTrades = await Trade.query().where('user_id', userId).orderBy('date_time', 'desc')
      .paginate(page, perPage);
    const trades = paginatedTrades.all();

    if (trades.length === 0) {
      return;
    }

    let tradesByDay: { date: string, totalProfit: number, trades: Trade[] }[] = [];
    trades.forEach(trade => {
      const date = trade.dateTime.toISODate()!;
      const day = tradesByDay.find(day => day.date === date);
      if (day) {
        day.totalProfit += Number(trade.profit);
        day.trades.push(trade);
      } else {
        tradesByDay.push({ date, totalProfit: Number(trade.profit), trades: [trade] });
      }
    });

    const lastDate = new Date(tradesByDay[tradesByDay.length - 1].date);
    const startDate = new Date(lastDate);
    startDate.setUTCHours(0,0,0,0);

    const endDate = new Date(lastDate);
    endDate.setUTCHours(23,59,59,999);

    // The last day might be incomplete. We have to get its full totalProfit sum
    const lastDayTrades = await Trade.query().where('user_id', userId)
      .whereBetween('date_time', [startDate.toISOString(), endDate.toISOString()])
      .exec();

    let lastDayTotal = 0;
    lastDayTrades.forEach(trade => lastDayTotal += trade.profit);
    tradesByDay[tradesByDay.length - 1].totalProfit = lastDayTotal;

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
