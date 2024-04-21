import s from '@/styles/auth/auth.module.css'

const Page = () => {
    return (
        <>
            <div className={s.authOverlay + ' ' + s.signup}>
            </div>
            <div className={s.authFormDiv}>
                <h2 className={s.authHeading}>Sign up</h2>
                <form id="signup-form" method="post">
                    <div className={s.inputOne}><input className={s.inputField} type="email" placeholder="Email"
                                                    name="email" value=""/></div>
                    <div className={s.inputOne}><input className={s.inputField} type="username" placeholder="Username"
                                                    name="username" value=""/></div>
                    <div className={s.inputTwo}><input className={s.inputField} type="password" placeholder="Create a Password"
                                                    name="password" value=""/></div>
                    <button className={s.button + ' ' + s.buttonFill + ' ' + s.buttonMedium} type="submit">Sign up
                    </button>
                </form>
                <div className={s.pageAdditional}><a href="/auth/login" rel="nofollow">Already have an account? Log in.</a></div>
            </div>
        </>
    )
}

export default Page