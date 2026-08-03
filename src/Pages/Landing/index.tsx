import { Typography } from 'antd';
import CurrencyCard from "../../Components/CurrencyCard";
import ConvertRateCard from '../../Components/ConverRateCard';
import './Landing.css';

const { Title } = Typography;

function Landing() {
    return (
        <div>
            <Title className='text-left'>Hi, Ulf..</Title>
            <div className='currencyWrapper'>
                <CurrencyCard />
                <ConvertRateCard currentRate={12} />
            </div>
        </div>
    )
}

export default Landing;