import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";

export default function Tags() {
    return (
        <div className={styledGlobal.container}>
            <h1>Tags</h1>
            <CardGridX
                url={'https://api.rawg.io/api/tags?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}