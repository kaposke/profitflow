import React, { useState } from 'react';
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import ReactDatePicker from 'react-datepicker';

import { Container, Form, BuyButton, SellButton } from './styles';
import AppCard from '../AppCard';
import Button from '../Button';
import Trade from '../../models/Trade';
import Input from '../Input';

const schema = yup.object().shape({
  product: yup.string().required().label('Product'),
  profit: yup.number().required().label('Profit'),
  description: yup.string().optional(),
  date_time: yup.date().required(),
});

interface Props {
  trade?: Trade;
  onSubmit(formData: Trade): void;
}

const TradeForm: React.FC<Props> = ({ onSubmit, trade }) => {
  const [action, setAction] = useState<string>(trade ? trade.action : '');

  const { register, handleSubmit, control, errors, setError, clearErrors } = useForm<Trade>({
    resolver: yupResolver(schema),
    defaultValues: trade ? { ...trade } : { date_time: new Date() }
  });

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
      setError('action', { type: 'manual', message: 'You must select your action.' });

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

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              name='description'
              rows={4}
              ref={register}
            />
          </div>

          <Controller
            className='date-picker-wrapper'
            control={control}
            name="date_time"
            render={props => (
              <ReactDatePicker
                {...props}
                placeholderText="Select date"
                selected={props.value}
                dateFormat='hh:mm dd/MM/yyyy'
                showTimeInput
                // startOpen={true}
              />
            )}
          />

          <Button type='submit'>Save</Button>
        </Form>
      </Container>
    </AppCard>
  );
}

export default TradeForm;