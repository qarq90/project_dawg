import styledGlobal from "@/styles/pages/global.module.css"
import CardGrid from "@/components/ui/CardGrid.jsx";

export default function Trending() {
    return (
        <div className={styledGlobal.container}>
            <h1>Trending</h1>

            <CardGrid
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&ordering=-rating'}
            />
        </div>
    )
}