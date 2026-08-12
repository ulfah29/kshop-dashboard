import { useState } from 'react';
import { Button, Card, Typography, Input, Space } from 'antd';

const { Title } = Typography;

interface StructProps {
    currentRate: number;
}

function ConvertRateCard(props: StructProps) {
    const [amountValue, setAmountValue] = useState<number>(0);
    const currentRate = props.currentRate || 0;

    const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value) || 0;

        setAmountValue(inputValue);
    }

    return (
        <Card>
            <Title level={4} className='mt-0'>Convert</Title>
            <Title level={2} className='mt-0'>
                {(amountValue || 0) * currentRate}
            </Title>
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder='Put the amount' type='number' value={amountValue} onChange={e => handleInputAmount(e)} />
                <Button type="primary">Submit</Button>
            </Space.Compact>
        </Card>
    )
}

export default ConvertRateCard;
