import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid.jsx";

export default function Year() {
    return (
        <div className={styledGlobal.container}>
            <h1>Best of the Year</h1>
            <CardGrid
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&dates=2024-01-01,2024-12-31&ordering=-rating,-metacritic'}
            />
        </div>
    )
}