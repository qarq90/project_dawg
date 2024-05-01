import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";

export default function Developers() {
    return (
        <div className={styledGlobal.container}>
            <h1>Developers</h1>
            <CardGridX
                url={'https://api.rawg.io/api/developers?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}