import { DashboardCards } from '@/pages/home/ui/cards';
import { DashboardCharts } from '@/pages/home/ui/chart';

const Home = () => {
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <DashboardCards />
            <DashboardCharts />
        </div>
    );
};

export default Home;
