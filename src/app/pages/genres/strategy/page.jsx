import styledGlobal from "@/styles/pages/global.module.css"
import CardGridGenres from "@/components/ui/CardGridGenres";

export default function Strategy() {
    return (
        <div className={styledGlobal.container}>
<<<<<<< HEAD
            <h1>Puzzle</h1>
=======
            <h1>Strategy</h1>
>>>>>>> qarq90
            <CardGridGenres
                url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971&genres=10'}
            />
        </div>
    )
}