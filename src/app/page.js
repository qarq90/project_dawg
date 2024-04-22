import styledGlobal from "@/styles/pages/global.module.css";
import {Card} from "@/components/ui/Card";
import {WindowsIcon} from "../../public/icon/WindowsIcon";
import {PlaystationIcon} from "../../public/icon/PlaystationIcon";
import {XBoxIcon} from "../../public/icon/XBoxIcon";

export default function Home() {

    const platforms = [
        <XBoxIcon key="1"/>,
        <PlaystationIcon key="2"/>,
        <WindowsIcon key="3"/>,
    ];

    return (
        <div className={styledGlobal.container}>
            <h1>Home</h1>
            <div className={styledGlobal.dropdownContainer}>
                <select>
                    <option value="" disabled selected>Platforms</option>
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
            <div className={styledGlobal.gamesGrid}>
                <div className={styledGlobal.gamesColumn}>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                </div>
                <div className={styledGlobal.gamesColumn}>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                </div>
                <div className={styledGlobal.gamesColumn}>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                </div>
                <div className={styledGlobal.gamesColumn}>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                    <Card gameName={"GTA5"} platforms={platforms}/>
                </div>
            </div>
        </div>
    );
}
