import styledGlobal from "@/styles/pages/global.module.css";
<<<<<<< HEAD
import CardGridPlatforms from "@/components/pages/browse/CardGridPlatforms";
=======
import CardGridX from "@/components/ui/CardGridX.jsx";
>>>>>>> qarq90

export default function Platforms() {
    return (
        <div className={styledGlobal.container}>
            <h1>Platforms</h1>
<<<<<<< HEAD
            <CardGridPlatforms
=======
            <CardGridX
>>>>>>> qarq90
                url={'https://api.rawg.io/api/platforms?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}