import styledGlobal from "@/styles/pages/global.module.css";
<<<<<<< HEAD
import CardGridGenres from "@/components/pages/browse/CardGridGenres";
import CardGridDevelopers from "@/components/pages/browse/CardGridDevelopers";
=======
import CardGridX from "@/components/ui/CardGridX.jsx";
>>>>>>> qarq90

export default function Developers() {
    return (
        <div className={styledGlobal.container}>
            <h1>Developers</h1>
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
<<<<<<< HEAD
            <CardGridDevelopers
=======
            <CardGridX
>>>>>>> qarq90
                url={'https://api.rawg.io/api/developers?key=9560492cd5c24a7cbe8ae7e99bb58971'}
            />
        </div>
    )
}