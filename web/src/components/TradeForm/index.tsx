import React, { useState } from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { Container, Form, BuyButton, SellButton } from './styles';
import AppCard from '../AppCard';
import Button from '../Button';
import Trade from '../../models/Trade';
import Input from '../Input';

interface FormData {
  action: string;
  product: string;
  profit: number;
  entry_price: number;
  exit_price: number;
  description: string;
}

const schema = yup.object().shape({
  product: yup.string().required().label('Product'),
  profit: yup.number().required().label('Profit'),
  entry_price: yup.number().required().label('Entry price'),
  exit_price: yup.number().required().label('Exit price'),
  description: yup.string().optional(),
});

interface Props {
  onSubmit(formData: FormData): void;
}

const TradeForm: React.FC<Props> = ({ onSubmit }) => {
  const [action, setAction] = useState<string>('');

  const { register, handleSubmit, errors, setError, clearErrors } = useForm<FormData>({ resolver: yupResolver(schema) });

  function selectBuy() {
    setAction('buy');
    clearErrors('action');
  }

  function selectSell() {
    setAction('sell');
    clearErrors('action');
  }

  function submit(formData: Trade) {
    if (action === '')
      setError('action', { type: 'manual', message: 'You must select your action.' })

    onSubmit({ ...formData, action });
  }

  return (
    <AppCard>
      <Container>
        <Form onSubmit={handleSubmit(submit)}>
          <div className="action-buttons">
            <BuyButton type='button' selected={action !== "sell"} onClick={selectBuy}>Buy</BuyButton>
            <SellButton type='button' selected={action !== "buy"} onClick={selectSell}>Sell</SellButton>
          </div>
          {errors.action && <p className='action-error'>{errors.action?.message}</p>}

          <div className="group">
            <div className="field">
              <label htmlFor="product">Product</label>
              <Input
                name='product'
                type="text"
                ref={register}
                error={errors.product?.message}
              />
            </div>

            <div className="field">
              <label htmlFor="profit">Profit / Loss</label>
              <Input
                name='profit'
                type="number"
                ref={register}
                error={errors.profit?.message}
                defaultValue={0}
              />
            </div>
          </div>

          <div className="group">
            <div className="field">
              <label htmlFor="entry_price">Entry Price</label>
              <Input
                name='entry_price'
                type="number"
                ref={register}
                error={errors.entry_price?.message}
                defaultValue={0}
              />
            </div>
            <div className="field">
              <label htmlFor="exit_price">Exit Price</label>
              <Input
                name='exit_price'
                type="number"
                ref={register}
                error={errors.exit_price?.message}
                defaultValue={0}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              name='description'
              rows={4}
              ref={register}
            />
          </div>

          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    </AppCard>
  );
}

export default TradeForm;