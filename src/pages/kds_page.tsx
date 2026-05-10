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

    const pendingCount = columns['col-1']?.items.length || 0;
    const doingCount = columns['col-2']?.items.length || 0;
    const doneCount = columns['col-3']?.items.length || 0;

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
        <div className='min-h-screen bg-[#F0F2F5] flex flex-col'>
            <Menu />
            <main className='flex flex-col flex-1 px-8 py-4 gap-5'>
                <div className='text-3xl font-bold text-[#0F172A]'>
                    Pedidos
                </div>
                <div className='grid grid-cols-4 gap-5'>
                    <Card
                        title='Pendentes'
                        number={pendingCount}
                        icon={Timer}
                        backgroundColor='bg-redLight'
                        borderColor='FF5151'
                    />
                    <Card
                        title='Em Preparo'
                        number={doingCount}
                        backgroundColor='bg-orangePrimary'
                        numberColor='text-orangePrimary'
                        icon={Lunch}
                        borderColor='FC9300'
                    />
                    <Card
                        title='Pronto'
                        number={doneCount}
                        backgroundColor='bg-greenPrimary'
                        numberColor='text-greenPrimary'
                        icon={Checked}
                        borderColor='22C55E'
                    />
                    <Card
                        title='Tempo médio'
                        number={formatAverageTime(averageTime)}
                        backgroundColor='bg-bluePrimary'
                        numberColor='text-bluePrimary'
                        icon={Clock}
                        borderColor='2F2BFF'
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