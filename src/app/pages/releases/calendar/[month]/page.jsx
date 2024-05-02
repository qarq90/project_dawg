import s from "@/styles/pages/global.module.css"
import Link from "next/link";
import CardGrid from "@/components/ui/CardGrid.jsx";
import {currentYear, getMonthDates, months} from "@/lib/helper.js";

export default function Calendar({params}) {

    const getMonth = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        return date.split('-')[1]
    }

    return (
        <div className={s.container}>
            <h1>Release calendar - {params.month} {currentYear}</h1>
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
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&dates=' + getMonthDates(params)}
            />
        </div>
    )
}