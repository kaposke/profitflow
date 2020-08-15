import React, { useState, useEffect } from 'react';
import { FiLogOut, FiSun, FiMoon, FiArrowUp } from 'react-icons/fi';

import { Container, Header, Trades, NoTradesContainer } from './styles';

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
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    tradeService.get().then(response => setTrades(response.data))
  }, []);

  function handleFormSubmit(trade: Trade) {
    tradeService.create(trade).then(response => {
      setTrades([response.data, ...trades]);
      setShowForm(false);
    });
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
          <TradeForm onSubmit={handleFormSubmit}/>
        ) : (
            <Button type='button' onClick={() => setShowForm(true)}>New Trade</Button>
          )}
        <Trades>
          {trades.length > 0 ? trades.map(trade => (
            <TradeCard key={trade.id} trade={trade} />
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
      </Container>
    </RegularLayout>
  );
}

export default TradeList;