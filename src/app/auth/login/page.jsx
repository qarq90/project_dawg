import s from '@/styles/auth/auth.module.css'

const Page = () => {
    return (
        <>
            <div className={s.authOverlay + ' ' + s.login}>
            </div>
            <div className={s.authFormDiv}>
                <h2 className={s.authHeading}>Log in</h2>
                <form id="login-form" method="post">
                    <div className={s.inputOne}><input className={s.inputField} type="email" placeholder="Email"
                                                    name="email" value=""/></div>
                    <div className={s.inputTwo}><input className={s.inputField} type="password" placeholder="Password"
                                                    name="password" value=""/></div>
                    <button className={s.button + ' ' + s.buttonFill + ' ' + s.buttonMedium} type="submit">Log in
                    </button>
                </form>
                <div className={s.pageAdditional}><a href="/auth/signup" rel="nofollow">Don&#39;t have an account? Sign up.</a></div>
            </div>
        </>
    )
}

export default Page