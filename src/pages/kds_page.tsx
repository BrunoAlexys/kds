import Card from '../components/card';
import KintchenDisplay from '../components/kitchen_display';
import Menu from '../components/menu';
import { useKitchenStore } from '../store/useKitchenStore';
import Timer from '../assets/timer.png';
import Checked from '../assets/checked.png';
import Clock from '../assets/clock.png';
import Lunch from '../assets/lunch-time.png';
import { useEffect } from 'react';

function KdsPage() {

    const { columns, averageTime, fetchAverageTime } = useKitchenStore();

    useEffect(() => {
        fetchAverageTime();

        const interval = setInterval(() => {
            fetchAverageTime();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [fetchAverageTime])

    const pendingCount = columns['col-1'].items.length;
    const doingCount = columns['col-2'].items.length;
    const doneCount = columns['col-3'].items.length;

    const formatAverageTime = (valueInMinutes: number) => {
        if (!valueInMinutes) return '0m';

        const totalSeconds = Math.round(valueInMinutes * 60);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
        }

        return `${minutes}m ${seconds}s`;
    };

    return (
        <div className='min-h-screen bg-[#F7F7F7] flex flex-col'>
            <Menu />
            <main className='flex flex-col flex-1 px-8 py-8 gap-8'>
                <div className='grid grid-cols-4 gap-6'>
                    <Card
                        title='Pendentes'
                        number={pendingCount}
                        icon={Timer}
                    />
                    <Card
                        title='Em Preparo'
                        number={doingCount}
                        backgroundColor='bg-orangePrimary'
                        numberColor='text-orangePrimary'
                        icon={Lunch}
                    />
                    <Card
                        title='Pronto'
                        number={doneCount}
                        backgroundColor='bg-greenPrimary'
                        numberColor='text-greenPrimary'
                        icon={Checked}
                    />
                    <Card
                        title='Tempo médio'
                        number={formatAverageTime(averageTime)}
                        backgroundColor='bg-bluePrimary'
                        numberColor='text-bluePrimary'
                        icon={Clock}
                    />
                </div>
                <div className='flex-1 w-full '>
                    <KintchenDisplay />
                </div>

            </main>
        </div>
    );
}

export default KdsPage;