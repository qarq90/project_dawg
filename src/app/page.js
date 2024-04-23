import styledGlobal from "@/styles/pages/global.module.css";
import CardGrid from "@/components/ui/CardGrid";

export default function Home() {

    return (
        <>
            <div className={styledGlobal.container}>
                <h1>Home</h1>
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
                <CardGrid
                    url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971'}
                />
            </div>
        </>
    );
}
