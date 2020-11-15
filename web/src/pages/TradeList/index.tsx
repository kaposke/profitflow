import React, { useState, useEffect } from 'react';
import { FiLogOut, FiSun, FiMoon, FiArrowUp } from 'react-icons/fi';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { Container, Header, Trades, NoTradesContainer, StyledModal } from './styles';

import AppCard from '../../components/AppCard';
import Button from '../../components/Button';
import TradeCard from '../../components/TradeCard';
import TradeForm from '../../components/TradeForm';
import Logo from '../../components/Logo';
import { useAuth } from '../../contexts/auth';
import RegularLayout from '../../layouts/RegularLayout';
import { useTheme } from '../../contexts/theme';
import tradeService from '../../services/trade.service';
import Trade from '../../models/Trade';
import { Trans, useTranslation } from 'react-i18next';

interface Day {
  date: string;
  totalProfit: number;
  trades: Trade[];
}

const TradeList: React.FC = () => {
  const { t } = useTranslation();

  const { signOut } = useAuth();
  const { lightOn, toggle } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadedAllTrades, setLoadedAllTrades] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [tradeDays, setTradeDays] = useState<Day[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deletingAttemptId, setDeletingAttemptId] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const perPage = 8;

  // Load more on scroll to bottom
  useBottomScrollListener(() => {
    if (!loading && !loadedAllTrades)
      setPage(page + 1);
  });

  // Load page and add trades to days, or create days that do not yet exist
  useEffect(() => {
    setLoading(true);
    tradeService.get(page, perPage).then(response => {
      const { data } = response;

      if (!data) {
        setLoadedAllTrades(true);
        setLoading(false);
        return;
      };

      let days: Day[] = [...tradeDays];
      const existingDates = days.map(day => day.date);

      data.forEach((day: Day) => {
        day.trades = day.trades.map(trade => ({ ...trade, date_time: new Date(trade.date_time) }));
        const dayIndex = existingDates.findIndex(date => date === day.date);

        if (dayIndex === -1) {
          existingDates.push(day.date);
          days.push(day);
        } else
          days[dayIndex].trades.push(...day.trades);
      });

      setTradeDays(days);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleFormSubmit(trade: Trade) {
    tradeService.create(trade).then(response => {
      const date = DateTime.fromJSDate(trade.date_time).toISODate();

      const dayToInsert = tradeDays.find(day => day.date === date);
      let newDayList: Day[];
      if (dayToInsert) {
        newDayList = tradeDays.map(day =>
          day === dayToInsert ?
            {
              ...day,
              trades: [{ ...response.data, date_time: trade.date_time }, ...day.trades],
              totalProfit: day.totalProfit + trade.profit,
            }
            :
            day
        );
      } else {
        newDayList = [{ date: date!, trades: [{ ...response.data, date_time: trade.date_time }], totalProfit: trade.profit }, ...tradeDays];
      }

      setTradeDays(newDayList.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))));
      setShowForm(false);
    });
  }

  function onClickDelete(id: number) {
    setDeleteConfirmation(true);
    setDeletingAttemptId(id);
  }

  async function onDeleteConfirmation() {
    setDeleteConfirmation(false);
    await tradeService.delete(deletingAttemptId);
    const days = tradeDays;
    const day = days.find(d => d.trades.find(t => t.id === deletingAttemptId));
    if (!day) return;

    day.trades = day.trades.filter(t => t.id !== deletingAttemptId);
    day.totalProfit = day.trades.map(t => t.profit).reduce((total, profit) => total += profit);

    // const days = tradeDays.map(day => ({ ...day, trades: day.trades.filter(trade => trade.id !== deletingAttemptId) }))
    setTradeDays(days.filter(day => day.trades.length > 0));

    toast.error(t('tradeDeleted'));
  }

  return (
    <RegularLayout>
      <Container>
        <AppCard>
          <Header>
            {lightOn ?
              <FiMoon onClick={() => toggle()} />
              :
              <FiSun onClick={() => toggle()} />
            }
            <Logo />
            <FiLogOut onClick={signOut} />
          </Header>
        </AppCard>

        {showForm ? (
          <TradeForm onSubmit={handleFormSubmit} />
        ) : (
            <Button type='button' onClick={() => setShowForm(true)}>{t('newTrade')}</Button>
          )}

        <Trades>
          {tradeDays.length > 0 ? tradeDays.map((tradeDay, index) => (
            <div key={index} className='trade-day'>
              <AppCard className='day-card'>
                <span>
                  {DateTime.fromISO(tradeDay.date).toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })} ({DateTime.fromISO(tradeDay.date).toRelativeCalendar()})
                </span>
                {tradeDay.totalProfit > 0 ?
                  <span className='profit green'>+{t('currencySymbol')}{tradeDay.totalProfit}</span>
                  : tradeDay.totalProfit < 0 ?
                    <span className='profit red'>-{t('currencySymbol')}{Math.abs(tradeDay.totalProfit)}</span>
                    :
                    <span className='profit'>{t('currencySymbol')}{Math.abs(tradeDay.totalProfit)}</span>
                }
              </AppCard>
              {
                tradeDay.trades.map(trade => (
                  <TradeCard key={trade.id} trade={trade} onClickDelete={onClickDelete} />
                ))
              }
            </div>
          ))
            : !showForm &&
            <NoTradesContainer>
              <FiArrowUp />
              <Trans i18nKey='noTrades'>
                <p> <br /><span className='green'> </span></p>
              </Trans>
            </NoTradesContainer>
          }
        </Trades>

        <StyledModal
          isOpen={deleteConfirmation}
          onBackgroundClick={() => setDeleteConfirmation(false)}
          onEscapeKeydown={() => setDeleteConfirmation(false)}
        >
          <h2>{t('deletingTrade')}</h2>
          <p>{t('deletingTradeConfirmationQuestion')}</p>
          <div className="modal-buttons">
            <Button onClick={() => setDeleteConfirmation(false)}>{t('no')}</Button>
            <Button className='danger' onClick={onDeleteConfirmation}>{t('yes')}</Button>
          </div>
        </StyledModal>

      </Container>

    </RegularLayout>
  );
}

export default TradeList;