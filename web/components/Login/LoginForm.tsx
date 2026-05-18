export default function LoginForm({username, password, setUsername, setPassword, rememberMe, setRememberMe, handleLogin} : {setUsername : React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>, setPassword: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> ,username: string, password: string, rememberMe: boolean, setRememberMe: React.ChangeEventHandler<HTMLInputElement> ,handleLogin : React.MouseEventHandler<HTMLButtonElement>}){
    return(
        <div className="mx-auto flex flex-col justify-center items-center border-3 rounded-2xl gap-5 bg-orange-500 border-orange-500 shadow-md w-1/2 h-100">
            <input onChange={setUsername} value={username} type="text" placeholder="Uživatelské jméno" className="border-1 p-5 rounded-xl bg-white border-white w-3/4"/>
            <input onChange={setPassword} value={password} type="password" placeholder="Heslo" className="border-1 p-5 rounded-xl bg-white border-white w-3/4"/>
            <p className="text-md w-3/4 text-white font-black"> <input className="mr-2" type="checkbox" checked={rememberMe} onChange={setRememberMe}/> Pamatuj si mě</p>
            <button onClick={handleLogin} className="py-5 bg-green-300 rounded-2xl w-1/2 text-white font-black text-xl">Přihlásit</button>
        </div>
    ) 
}