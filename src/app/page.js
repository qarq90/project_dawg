import s from "@/styles/pages/global.module.css";

export default function Home() {
    return (
        <div className={s.container}>
            <div>
                <h1 className={s.heading1}>New and trending</h1>
                <p style={{margin: '8px 4px 0'}}>Based on player counts and release date</p>
            </div>
        </div>
    );
}
