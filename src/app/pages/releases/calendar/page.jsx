import styledGlobal from "@/styles/pages/global.module.css"
import CardGridPlatforms from "@/components/ui/CardGridPlatforms.jsx";

export default function Calendar() {
    return (
        <div className={styledGlobal.container}>
            <h1>Release calendar</h1>
            <CardGridPlatforms
                url={`https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&platforms=21&dates=2023-01-01,2023-12-31`}
            />
        </div>
    )
}