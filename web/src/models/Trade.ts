interface Trade {
  id?: number;
  action: string;
  product: string;
  profit: number;
  description: string;
  created_at?: string,
}

export default Trade;