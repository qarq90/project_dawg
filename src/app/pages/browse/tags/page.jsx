import styledGlobal from "@/styles/pages/global.module.css";
import CardGridX from "@/components/ui/CardGridX.jsx";

export default function Tags() {
    return (
        <div className={styledGlobal.container}>
            <h1>Tags</h1>
            <div className={styledGlobal.dropdownContainer}>
                <select>
                    <option value="">Platforms</option>
                    <option value="">PC</option>
                    <option value="">Playstation</option>
                    <option value="">XBox</option>
                    <option value="">Android</option>
                    <option value="">IOS</option>
                    <option value="">MAC</option>
                    <option value="">Nintendo</option>
                    <option value="">Linux</option>
                </select>
            </div>
            <CardGridX
                url={'https://api.rawg.io/api/tags?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}