import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";

export default function Stores() {
    return (
        <div className={styledGlobal.container}>
            <h1>Stores</h1>
            <CardGridX
                url={'https://api.rawg.io/api/stores?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}