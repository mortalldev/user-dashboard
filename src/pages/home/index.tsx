import { DashboardCards } from './ui/cards';
import { DashboardCharts } from './ui/chart';

const Home = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <DashboardCharts />
            <DashboardCards />
        </div>
    );
};

export default Home;
