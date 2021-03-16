import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database'
import Trade from 'App/Models/Trade';
import TradeStoreValidator from 'App/Validators/Trade/TradeStoreValidator';

export default class TradesController {
  public async index ({ request, auth }: HttpContextContract) {
    const { page, perPage } = request.get();
    const userId = auth.user!.id;
    const paginatedTrades = await Trade.query().where('user_id', userId).orderBy('date_time', 'desc')
      .paginate(page, perPage);
    const trades = paginatedTrades.all();
    
    if (trades.length == 0)
      return;
    
    const firstDate = trades[0].dateTime.endOf('month').toISO()!;
    const lastDate = trades[trades.length - 1].dateTime.startOf('month').toISO()!;

    
    const months = (await Database.rawQuery(`
      select DATE_FORMAT(date_time, '%Y-%m') as date, sum(profit) as totalProfit, count(*) as tradeCount
      from trades
      where user_id = ? and date_time <= ? and date_time >= ?
      group by date
      order by date desc;
    `, [userId, firstDate, lastDate]))[0];

    const days = (await Database.rawQuery(`
      select DATE_FORMAT(date_time, '%Y-%m-%d') as date, sum(profit) as totalProfit, count(*) as tradeCount
      from trades
      where user_id = ? and date_time <= ? and date_time >= ?
      group by date
      order by date desc;
    `, [userId, firstDate, lastDate]))[0];

    return {
      months: months.map((month) => ({ ...month, date: new Date(month.date).toISOString()})),
      days: days.map((day) => ({ ...day, date: new Date(day.date).toISOString()})),
      trades: trades,
    };

    // SELECT  Closing_Date = DATEADD(MONTH, DATEDIFF(MONTH, 0, Closing_Date), 0), 
    //         Category,  
    //         COUNT(Status) TotalCount 
    // FROM    MyTable
    // WHERE   Closing_Date >= '2012-02-01' 
    // AND     Closing_Date <= '2012-12-31'
    // AND     Defect_Status1 IS NOT NULL
    // GROUP BY DATEADD(MONTH, DATEDIFF(MONTH, 0, Closing_Date), 0), Category;

    // // Days
    // interface Day {
    //   date: string;
    //   totalProfit: number;
    //   tradeCount: number;
    //   trades: Trade[];
    // }

    // let days: Day[] = [];
    // trades.forEach(trade => {
    //   const date = trade.dateTime.toISODate()!;
    //   const day = days.find(day => day.date === date);
    //   if (day) {
    //     day.totalProfit += Number(trade.profit);
    //     day.tradeCount += 1;
    //     day.trades.push(trade);
    //   } else {
    //     days.push({ date, totalProfit: Number(trade.profit), tradeCount: 1, trades: [trade] });
    //   }
    // });

    // const lastDate = new Date(days[days.length - 1].date);
    // const startDate = new Date(lastDate);
    // startDate.setUTCHours(0,0,0,0);

    // const endDate = new Date(lastDate);
    // endDate.setUTCHours(23,59,59,999);

    // // The last day might be incomplete. We have to get its full totalProfit sum
    // const lastDayTrades = await Trade.query().where('user_id', userId)
    //   .whereBetween('date_time', [startDate.toISOString(), endDate.toISOString()])
    //   .exec();

    // let lastDayTotal = 0;
    // lastDayTrades.forEach(trade => lastDayTotal += trade.profit);
    // days[days.length - 1].totalProfit = lastDayTotal;
    // days[days.length - 1].tradeCount = lastDayTrades.length;

    // // Months
    // interface Month {
    //   date: string;
    //   totalProfit: number;
    //   tradeCount: number;
    //   days: Day[];
    // }

    // let months: Month[] = []
    // days.forEach(day => {
    //   const dayDate = new Date(day.date);
    //   const monthYear = `${dayDate.getMonth()}/${dayDate.getFullYear()}`

    //   const month = months.find(month => month.date == monthYear);
    //   if (month) {
    //     month.totalProfit += day.totalProfit;
    //     month.tradeCount += day.tradeCount;
    //     month.days.push(day);
    //   } else {
    //     months.push({date: monthYear, totalProfit: day.totalProfit, tradeCount: day.tradeCount, days: [day]});
    //   }
    // })

    // return days;
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
