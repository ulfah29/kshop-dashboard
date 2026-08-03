import { Button, Card, Typography } from 'antd';
import { useExchangeRate } from "../../Hooks/useExchangeRate";
import './CurrencyCard.css';

const { Title } = Typography;

export default function CurrencyCard() {
  const { rate, loading, error, refresh } = useExchangeRate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card loading={loading} className='mr-16'>
      <Title level={4} className='mt-0'>Today's Won rate</Title>
      <Title level={2} className='mt-0'>{rate?.toFixed(2) || 0}</Title>

      <Button type="primary" onClick={refresh}>
        Refresh
      </Button>
    </Card>
  );
}