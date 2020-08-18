interface Trade {
  id?: number;
  action: string;
  entry_price: number;
  exit_price: number;
  product: string;
  profit: number;
  description: string;
  created_at: Date,
}

export default Trade;