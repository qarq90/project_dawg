import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid.jsx";

export default function Latest() {
    const getDates = () => {
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const date = now.toISOString().split('T')[0];
        const lastMonthDate = lastMonth.toISOString().split('T')[0];
        return `${lastMonthDate},${date}`
    }

    return (
        <div className={styledGlobal.container}>
            <h1>Last 30 days</h1>
            <CardGrid
                    url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&dates=' + getDates()}
                />
        </div>
    )
}