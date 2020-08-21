import React, { useState, useEffect } from 'react';
import { FiLogOut, FiSun, FiMoon, FiArrowUp } from 'react-icons/fi';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';


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

const TradeList: React.FC = () => {
  const { signOut } = useAuth();
  const { lightOn, toggle } = useTheme();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [tradesByDay, setTradesByDay] = useState<{ date: string, trades: Trade[] }[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deletingAttemptId, setDeletingAttemptId] = useState<number>(0);

  useEffect(() => {
    tradeService.get().then(response => {
      console.log(response.data);
      setTradesByDay(response.data);
    })
  }, []);

  function handleFormSubmit(trade: Trade) {
    tradeService.create(trade).then(response => {
      const date = DateTime.fromISO(response.data.created_at!).toISODate();

      const dayToInsert = tradesByDay.find(day => day.date === date);
      if (dayToInsert) {
        setTradesByDay(tradesByDay.map(day =>
          day === dayToInsert ? { ...day, trades: [response.data, ...day.trades] } : day
        ));
      } else {
        setTradesByDay([{ date: date!, trades: [response.data] }, ...tradesByDay]);
      }
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
    const days = tradesByDay.map(day => ({ ...day, trades: day.trades.filter(trade => trade.id !== deletingAttemptId)}))
    setTradesByDay(days.filter(day => day.trades.length > 0));
    
    toast.error('Trade deleted successfully');
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
            <Button type='button' onClick={() => setShowForm(true)}>New Trade</Button>
          )}

        <Trades>
          {tradesByDay.length > 0 ? tradesByDay.map((tradeDay, index) => (
            <div key={index} className='trade-day'>
              <AppCard>{DateTime.fromISO(tradeDay.date).toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })} ({DateTime.fromISO(tradeDay.date).toRelativeCalendar()})</AppCard>
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
              <p>
                You don't have any trades yet!<br />
                Click <span className='green'>New Trade</span> to create your first one.
              </p>
            </NoTradesContainer>
          }
        </Trades>

        <StyledModal
          isOpen={deleteConfirmation}
          onBackgroundClick={() => setDeleteConfirmation(false)}
          onEscapeKeydown={() => setDeleteConfirmation(false)}
        >
          <h2>Deleting trade</h2>
          <p>Are you sure you want to delete this trade?</p>
          <div className="modal-buttons">
            <Button onClick={() => setDeleteConfirmation(false)}>No</Button>
            <Button className='danger' onClick={onDeleteConfirmation}>Yes, delete trade</Button>
          </div>
        </StyledModal>

      </Container>

    </RegularLayout>
  );
}

export default TradeList;