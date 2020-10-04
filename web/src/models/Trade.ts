interface Trade {
  id?: number;
  action: string;
  product: string;
  profit: number;
  description: string;
  date_time: Date,
}

export default Trade;