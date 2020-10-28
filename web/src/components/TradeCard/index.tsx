import React, { useState } from 'react';
import AppCard from '../AppCard';
import { MdExpandMore } from 'react-icons/md';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DateTime } from 'luxon';

import { Container } from './styles';

import Trade from '../../models/Trade';
import TradeForm from '../TradeForm';
import tradeService from '../../services/trade.service';
import { useTranslation } from 'react-i18next';

interface Props {
  trade: Trade;
  onClickDelete?(id: number): void;
}

const TradeCard: React.FC<Props> = ({ trade: tradeInfo, onClickDelete }) => {
  const { t } = useTranslation();

  const [trade, setTrade] = useState<Trade>(tradeInfo);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  async function onSave(newTrade: Trade) {
    await tradeService.update(trade.id!, newTrade);
    setTrade({ ...trade, ...newTrade });
    setEditing(false);
  }

  if (editing)
    return (
      <TradeForm trade={trade} onSubmit={onSave} />
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
                    <strong className="green">{t('buy')}</strong>
                  </div>
                  :
                  <div className="action">
                    <strong className="red">{t('sell')}</strong>
                  </div>
              }
            </div>
          </div>
          <div className='product'>
            <h1>{trade.product}</h1>
            <span>{DateTime.fromJSDate(trade.date_time).toLocaleString(DateTime.TIME_SIMPLE)}</span>
          </div>
          {trade.profit > 0 ?
            <span className="profit green">+{t('currencySymbol')}{trade.profit}</span>
            : trade.profit < 0 ?
            <span className="profit red">-{t('currencySymbol')}{Math.abs(trade.profit)}</span>
            :
            <span className="profit">{t('currencySymbol')}{Math.abs(trade.profit)}</span>
          }
          <MdExpandMore onClick={() => setExpanded(!expanded)} />
        </div>
        {expanded &&
          <div className="expanded-space">
            <div className='expanded-header'>
              <span>{t('description')}</span>
              <div className='controlls'>
                <FiEdit onClick={() => setEditing(true)} />
                <FiTrash2 className='red' onClick={() => onClickDelete && onClickDelete(trade.id!)} />
              </div>
            </div>
            <p>{trade.description || t('noDescription')}</p>
          </div>
        }
      </Container>
    </AppCard>
  )
}

export default TradeCard;