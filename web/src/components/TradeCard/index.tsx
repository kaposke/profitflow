import React, { useState } from 'react';
import AppCard from '../AppCard';
import { MdExpandMore } from 'react-icons/md';

import { Container } from './styles';
import Trade from '../../models/Trade';

interface Props {
  trade: Trade;
}

const TradeCard: React.FC<Props> = ({ trade }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

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
          <h1>{trade.product}</h1>
          {trade.profit > 0 ?
            <span className="profit green">+R${trade.profit}</span>
            :
            <span className="profit red">-R${Math.abs(trade.profit)}</span>
          }
          <MdExpandMore onClick={() => setExpanded(!expanded)} />
        </div>
        {expanded &&
          <div className="expanded-space">
            <span>Description</span>
            <p>{trade.description}</p>
          </div>
        }
      </Container>
    </AppCard>
  )
}

export default TradeCard;