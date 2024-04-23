import styledGlobal from "@/styles/pages/global.module.css";
import CardGridPlatforms from "@/components/pages/browse/CardGridPlatforms";

export default function Platforms() {
    return (
        <div className={styledGlobal.container}>
            <h1>Platforms</h1>
            <CardGridPlatforms
                url={'https://api.rawg.io/api/platforms?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}