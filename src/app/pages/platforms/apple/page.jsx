import styledGlobal from "@/styles/pages/global.module.css"
import CardGridPlatforms from "@/components/ui/CardGridPlatforms";

export default function Apple() {
    return (
        <div className={styledGlobal.container}>
            <h1>IOS</h1>
            <CardGridPlatforms
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&platforms=3'}
            />
        </div>
    )
}