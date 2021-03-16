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
import Capitalized from '../../components/Capitalized';

interface Month {
  date: string,
  totalProfit: number,
  tradeCount: number;
}

interface Day {
  date: string;
  totalProfit: number;
  tradeCount: number;
}

function sameMonth(iso1: string, iso2: string) {
  const first = new Date(iso1);
  const second = new Date(iso2);
  return first.getUTCMonth() == second.getUTCMonth() && first.getUTCFullYear() == second.getUTCFullYear();
}

function sameDay(iso1: string, iso2: string) {
  const first = new Date(iso1);
  const second = new Date(iso2);
  return first.getUTCDate() == second.getUTCDate();
}

const TradeList: React.FC = () => {
  const { t } = useTranslation();

  const { signOut } = useAuth();
  const { lightOn, toggle } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadedAllTrades, setLoadedAllTrades] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [months, setMonths] = useState<Month[]>([]);
  const [days, setDays] = useState<Day[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);

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

      // Add only not yet existing month and days, and convert their dates to  Dates
      setMonths([...months, ...data.months.filter((month: Month) => !months.map(m => m.date).includes(month.date))]);
      setDays([...days, ...data.days.filter((day: Day) => !days.map(d => d.date).includes(day.date))]);
      setTrades([...trades, ...data.trades]);

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function handleFormSubmit(trade: Trade) {
    const response = await tradeService.create(trade);

    const date = DateTime.fromISO(trade.date_time).toISODate();

    // Add trade

    setShowForm(false);
  }

  function onClickDelete(id: number) {
    setDeleteConfirmation(true);
    setDeletingAttemptId(id);
  }

  async function onDeleteConfirmation() {
    setDeleteConfirmation(false);
    await tradeService.delete(deletingAttemptId);
    // const days = tradeDays;
    // const day = days.find(d => d.trades.find(t => t.id === deletingAttemptId));
    // if (!day) return;

    // day.trades = day.trades.filter(t => t.id !== deletingAttemptId);
    // day.totalProfit = day.trades.map(t => t.profit).reduce((total, profit) => total += profit);

    // // const days = tradeDays.map(day => ({ ...day, trades: day.trades.filter(trade => trade.id !== deletingAttemptId) }))
    // setTradeDays(days.filter(day => day.trades.length > 0));

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
          {
            months.length > 0 ? months.map((month, index) => (
              <div key={index} className='month'>
                <AppCard className='group-card'>
                  <Capitalized>{DateTime.fromISO(month.date).toLocaleString({ month: 'long', year: 'numeric' })}</Capitalized>
                  <div>
                    <span className='trade-count'>{month.tradeCount} {month.tradeCount > 1 ? 'trades' : 'trade'}</span>
                    {
                      month.totalProfit > 0 ?
                        <span className='profit green'>+{t('currencySymbol')}{month.totalProfit}</span>
                        : month.totalProfit < 0 ?
                          <span className='profit red'>-{t('currencySymbol')}{Math.abs(month.totalProfit)}</span>
                          :
                          <span className='profit'>{t('currencySymbol')}{Math.abs(month.totalProfit)}</span>
                    }
                  </div>
                </AppCard>

                <div className='days'>
                  {
                    days.filter(day => sameMonth(day.date, month.date)).map((day, index) => (
                      <div key={index} className='day'>
                        <AppCard className='group-card'>
                          {/* <span>{day.date}</span> */}
                          <Capitalized>{DateTime.fromISO(day.date).toLocaleString({ weekday: 'long', day: '2-digit' })}</Capitalized>
                          <div>
                            <span className='trade-count'>{day.tradeCount} {day.tradeCount > 1 ? 'trades' : 'trade'}</span>
                            {
                              day.totalProfit > 0 ?
                                <span className='profit green'>+{t('currencySymbol')}{day.totalProfit}</span>
                                : day.totalProfit < 0 ?
                                  <span className='profit red'>-{t('currencySymbol')}{Math.abs(day.totalProfit)}</span>
                                  :
                                  <span className='profit'>{t('currencySymbol')}{Math.abs(day.totalProfit)}</span>
                            }
                          </div>
                        </AppCard>

                        <div className="trades">
                          {
                            trades.filter(trade => sameDay(trade.date_time, day.date)).map((trade) => (
                              <TradeCard key={trade.id} trade={trade} />
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
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