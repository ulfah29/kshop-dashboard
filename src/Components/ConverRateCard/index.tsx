import { useState } from 'react';
import { Button, Card, Typography, Input, Space } from 'antd';
import { formatCurrency } from '../../lib/formatCurrency';
import getCurrentExchangeRate from '../../lib/getCurrentExchangeRate';
import { useDashboardContext } from '../../context';

const { Title } = Typography;

function ConvertRateCard() {
    const { exchangeRate } = useDashboardContext();
    const [amountValue, setAmountValue] = useState<number>(0);
    const currentExchangeRate = getCurrentExchangeRate(exchangeRate, 'exchange-rate-KRW-IDR');

    const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value) || 0;

        setAmountValue(inputValue);
    }

    return (
        <Card>
            <Title level={4} className='mt-0'>Convert</Title>
            <Title level={2} className='mt-0'>
                {formatCurrency((amountValue || 0) * currentExchangeRate, 'IDR')}
            </Title>
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder='Put the amount' type='number' value={amountValue} onChange={e => handleInputAmount(e)} />
                <Button type="primary">Submit</Button>
            </Space.Compact>
        </Card>
    )
}

export default ConvertRateCard;
