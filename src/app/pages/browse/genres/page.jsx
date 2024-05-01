import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";

export default function Genres() {
    return (
        <div className={styledGlobal.container}>
            <h1>Genres</h1>
            <CardGridX
                url={'https://api.rawg.io/api/genres?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}