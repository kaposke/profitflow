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
import { useTranslation } from 'react-i18next';
import { tYup } from '../../utils/tYup';


interface Props {
  trade?: Trade;
  onSubmit(formData: Trade): Promise<void>;
}

const TradeForm: React.FC<Props> = ({ onSubmit, trade }) => {
  const { t } = useTranslation();
  const [action, setAction] = useState<string>(trade ? trade.action : '');
  const [saving, setSaving] = useState<boolean>(false);

  const schema = yup.object().shape({
    product: yup.string().required().label(t('product')),
    profit: yup.number().required().label(t('profitLoss')),
    description: yup.string().optional(),
    date_time: yup.date().required(),
  });

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

  async function submit(formData: Trade) {
    if (action === '') {
      setError('action', { type: 'manual', message: t('noActionSelected') });
      return;
    }

    setSaving(true);
    await onSubmit({ ...formData, action });
    setSaving(false);
  }

  return (
    <AppCard>
      <Container>
        <Form onSubmit={handleSubmit(submit)}>
          <div className="action-buttons">
            <BuyButton type='button' selected={action !== "sell"} onClick={selectBuy}>{t('buy')}</BuyButton>
            <SellButton type='button' selected={action !== "buy"} onClick={selectSell}>{t('sell')}</SellButton>
          </div>
          {errors.action && <p className='action-error'>{errors.action?.message}</p>}

          <div className="group">
            <div className="field">
              <label htmlFor="product">{t('product')}</label>
              <Input
                name='product'
                type="text"
                ref={register}
                error={tYup(errors.product?.message)}
              />
            </div>

            <div className="field">
              <label htmlFor="profit">{t('profitLoss')}</label>
              <Input
                name='profit'
                type="number"
                ref={register}
                error={tYup(errors.profit?.message)}
                defaultValue={0}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description">{t('description')}</label>
            <textarea
              name='description'
              rows={4}
              ref={register}
            />
          </div>

          <div className="field">
            <label htmlFor="date_time">{t('dateTime')}</label>
            <Controller
              control={control}
              name="date_time"
              render={props => (
                <ReactDatePicker
                  {...props}
                  placeholderText="Select date"
                  selected={props.value}
                  dateFormat='hh:mm dd/MM/yyyy'
                  showTimeInput
                />
              )}
            />
          </div>

          <Button type='submit' loading={saving} loadingMessage={t('saving')}>{t('save')}</Button>
        </Form>
      </Container>
    </AppCard>
  );
}

export default TradeForm;