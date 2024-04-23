import styledGlobal from "@/styles/pages/global.module.css"
import CardGridPlatforms from "@/components/ui/CardGridPlatforms";

export default function Nintendo() {
    return (
        <div className={styledGlobal.container}>
            <h1>Nintendo</h1>
            <CardGridPlatforms
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&platforms=7'}
            />
        </div>
    )
}