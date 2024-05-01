import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";

export default function Creators() {
    return (
        <div className={styledGlobal.container}>
            <h1>Creators</h1>
            <CardGridX
                filter={'creator'}
                url={'https://api.rawg.io/api/creators?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}