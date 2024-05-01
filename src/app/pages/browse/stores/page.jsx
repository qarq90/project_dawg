import styledGlobal from "@/styles/pages/global.module.css";
<<<<<<< HEAD
import CardGridStores from "@/components/pages/browse/CardGridStores";
=======
import CardGridX from "@/components/ui/CardGridX.jsx";
>>>>>>> qarq90

export default function Stores() {
    return (
        <div className={styledGlobal.container}>
            <h1>Stores</h1>
<<<<<<< HEAD
            <CardGridStores
=======
            <CardGridX
>>>>>>> qarq90
                url={'https://api.rawg.io/api/stores?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}