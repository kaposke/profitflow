import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker'

// import { Container } from './styles';


const DatePicker: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <ReactDatePicker
      selected={date}
      onChange={(date) => setDate}
    />
  );
}

export default DatePicker;