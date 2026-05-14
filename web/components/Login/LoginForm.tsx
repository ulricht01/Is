export default function LoginForm({username, password, setUsername, setPassword, handleLogin} : {setUsername : React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>, setPassword: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> ,username: string, password: string, handleLogin : React.MouseEventHandler<HTMLButtonElement>}){
    return(
        <div className="mx-auto flex flex-col justify-center items-center w-1/2 border-1 rounded-2xl gap-5 p-5">
            <input onChange={setUsername} value={username} type="text" placeholder="Uživatelské jméno" className="border-1 p-2 rounded-xl"/>
            <input onChange={setPassword} value={password} type="password" placeholder="Heslo" className="border-1 p-2 rounded-xl"/>
            <button onClick={handleLogin}>Přihlásit</button>
        </div>
    ) 
}