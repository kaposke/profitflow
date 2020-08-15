import React, { useState } from 'react';

import { Container, Form, BuyButton, SellButton } from './styles';
import AppCard from '../AppCard';
import Button from '../Button';
import Trade from '../../models/Trade';

interface Props {
  onSubmit(formData: Trade): void;
}

const TradeForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Trade>({
    action: '',
    product: '',
    profit: 0,
    entry_price: 0,
    exit_price: 0,
    description: ''
  } as Trade);

  function selectBuy() {
    setFormData({ ...formData, action: 'buy' });
  }

  function selectSell() {
    setFormData({ ...formData, action: 'sell' });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <AppCard>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div className="action-buttons">
            <BuyButton type='button' selected={formData.action !== "sell"} onClick={selectBuy}>Buy</BuyButton>
            <SellButton type='button' selected={formData.action !== "buy"} onClick={selectSell}>Sell</SellButton>
          </div>

          <div className="group">
            <div className="field">
              <label htmlFor="product">Product</label>
              <input name='product' type="text" value={formData.product} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="profit">Profit / Loss</label>
              <input name='profit' type="number" value={formData.profit} onChange={handleChange} />
            </div>
          </div>

          <div className="group">
            <div className="field">
              <label htmlFor="entry_price">Entry Price</label>
              <input name='entry_price' type="number" value={formData.entry_price} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="exit_price">Exit Price</label>
              <input name='exit_price' type="number" value={formData.exit_price} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea name='description' rows={4} value={formData.description} onChange={handleChange} />
          </div>

          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    </AppCard>
  );
}

export default TradeForm;