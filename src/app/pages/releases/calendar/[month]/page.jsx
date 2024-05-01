import s from "@/styles/pages/global.module.css"
import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid.jsx";

export default function Calendar({params}) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getMonth = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        return date.split('-')[1]
    }

    const getDates = () => {
        const now = new Date();
        const startMonth = new Date(now.getFullYear(), months.indexOf(params.month), 1);
        const startDate = startMonth.toISOString().split('T')[0];
        const endMonth = new Date(now.getFullYear(), months.indexOf(params.month), 30);
        const endDate = endMonth.toISOString().split('T')[0];
        return `${startDate},${endDate}`
    }

    return (
        <div className={s.container}>
            <h1>Release calendar - {params.month} 2024</h1>
            <div className={s.calendarLinks}>
                {
                    months.map((month, index) => (
                        <Link className={s.calendarLink + ' ' + (params.month === month ? s.calendarLinkActive : '')}
                              key={index} href={'/pages/releases/calendar/' + month}>
                            {month}
                        </Link>
                    ))
                }
            </div>
            <CardGrid
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&dates=' + getDates()}
            />
        </div>
    )
}