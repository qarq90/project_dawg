import styledGlobal from "@/styles/pages/global.module.css"
import CardGridGenres from "@/components/ui/CardGridGenres";

export default function Racing() {
    return (
        <div className={styledGlobal.container}>
            <h1>Racing</h1>
            <CardGridGenres
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&genres=1'}
            />
        </div>
    )
}