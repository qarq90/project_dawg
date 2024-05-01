import styledGlobal from "@/styles/pages/global.module.css"
import CardGridGenres from "@/components/ui/CardGridGenres";

export default function Adventure() {
    return (
        <div className={styledGlobal.container}>
            <h1>Adventure</h1>
            <CardGridGenres
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&genres=3'}
            />
        </div>
    )
}