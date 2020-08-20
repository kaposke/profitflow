import React, { useState } from 'react';
import AppCard from '../AppCard';
import { MdExpandMore } from 'react-icons/md';

import { Container } from './styles';
import Trade from '../../models/Trade';
import { DateTime } from 'luxon';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import TradeForm from '../TradeForm';
import tradeService from '../../services/trade.service';

interface Props {
  trade: Trade;
}

const TradeCard: React.FC<Props> = ({ trade: tradeInfo }) => {
  const [trade, setTrade] = useState<Trade>(tradeInfo);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  async function onSave(newTrade: Trade) {
    console.log(trade.id);
    await tradeService.update(trade.id!, newTrade);
    setTrade({ ...trade, ...newTrade });
    setEditing(false);
  }

  if (editing) 
    return (
      <TradeForm trade={trade} onSubmit={onSave}/>
    );

  return (
    <AppCard>
      <Container expanded={expanded}>
        <div className="main">
          <div className="actions">
            <div className="action">
              {
                trade.action === 'buy' ?
                  <div className="action">
                    <strong className="green">Buy</strong> at {trade.entry_price}
                  </div>
                  :
                  <div className="action">
                    <strong className="red">Sell</strong> at {trade.exit_price}
                  </div>
              }
            </div>
            {
              trade.action === 'buy' ?
                <div className="action">
                  <strong className="red">Sell</strong> at {trade.exit_price}
                </div>
                :
                <div className="action">
                  <strong className="green">Buy</strong> at {trade.entry_price}
                </div>
            }
          </div>
          <div className='product'>
            <h1>{trade.product}</h1>
            <span>{DateTime.fromISO(trade.created_at!).toLocaleString(DateTime.TIME_SIMPLE)}</span>
          </div>
          {trade.profit > 0 ?
            <span className="profit green">+R${trade.profit}</span>
            :
            <span className="profit red">-R${Math.abs(trade.profit)}</span>
          }
          <MdExpandMore onClick={() => setExpanded(!expanded)} />
        </div>
        {expanded &&
          <div className="expanded-space">
            <div className='expanded-header'>
              <span>Description</span>
              <div className='controlls'>
                <FiEdit onClick={() => setEditing(true)}/>
                <FiTrash2 className='red'/>
              </div>
            </div>
            <p>{trade.description || 'No description available'}</p>
          </div>
        }
      </Container>
    </AppCard>
  )
}

export default TradeCard;