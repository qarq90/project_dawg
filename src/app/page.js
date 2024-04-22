import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {WindowsIcon} from "../../public/icon/WindowsIcon";
import {PlaystationIcon} from "../../public/icon/PlaystationIcon";
import {XBoxIcon} from "../../public/icon/XBoxIcon";
import CardGrid from "@/components/ui/CardGrid";

export default function Home() {

    const platforms = [
        <WindowsIcon key="1"/>,
        <PlaystationIcon key="2"/>,
        <XBoxIcon key="3"/>,
    ];

    const genres = [
        {
            title: "Action",
            link: '/genres/action'
        },
        {
            title: "RPG",
            link: '/genres/rpg'
        },
        {
            title: "Strategy",
            link: '/genres/strategy'
        }
    ]

    let cards = [
        {
            gameName: "Red Dead Redemption 2",
            genres: genres,
            likes: '1,200',
            image: "/img/u.jpg",
            platforms: platforms,
            releaseDate: "Apr 22, 2024",
            chart: "#1 Top 2024"
        },
        {
            gameName: "Vampire: The Masquerade - Bloodlines 2",
            genres: genres,
            likes: 100,
            image: "/img/x.jpg",
            platforms: platforms,
            releaseDate: "Apr 22, 2024",
            chart: "#1 Top 2024"
        },
        {
            gameName: "S.T.A.L.K.E.R. 2: Heart of Chernobyl",
            genres: genres,
            likes: '1,200',
            image: "/img/y.jpg",
            platforms: platforms,
            releaseDate: "Apr 22, 2024",
            chart: "#1 Top 2024"
        },
        {
            gameName: "Senua's Saga: Hellblade II",
            genres: genres,
            likes: '1,200',
            image: "/img/z.jpg",
            platforms: platforms,
            releaseDate: "Apr 22, 2024",
            chart: "#1 Top 2024"
        },
        {
            gameName: "Hollow Knight: Silksong",
            genres: genres,
            likes: '1,200',
            image: "/img/w.jpg",
            platforms: platforms,
            releaseDate: "Apr 22, 2024",
            chart: "#1 Top 2024"
        },
        {
            gameName: "Just Cause 3",
            genres: genres,
            likes: '1,200',
            image: "/img/v.jpg",
            platforms: platforms,
            releaseDate: "Apr 22, 2024",
            chart: "#1 Top 2024"
        }
    ];

    return (
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
            <CardGrid url={'https://api.rawg.io/api/games?key=9560492cd5c24a7cbe8ae7e99bb58971'} cards={cards}/>
        </div>
    );
}
