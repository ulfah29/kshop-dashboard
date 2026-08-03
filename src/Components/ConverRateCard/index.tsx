import { Button, Card, Typography, Input, Space } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

interface StructProps {
    currentRate: number;
}

function ConvertRateCard(props: StructProps) {
    const [amountValue, setAmountValue] = useState();
    const currentRate = props.currentRate || 0;

    const handleInputAmount = (e) => {
        const inputValue = e.target.value || 0;

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
