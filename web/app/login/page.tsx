"use client"

import Container from "@/components/PagesStructure/Container"
import {useState } from "react"
import LoginForm from "@/components/Login/LoginForm";
import Headline from "@/components/Login/Headline";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import Cookies from "js-cookie";


export default function Login(){
    
    const router = useRouter()

    const user = {
        username: "tomas",
        password: "123"
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangerRememberMe = (e) =>{
        setRememberMe(e.target.checked)
    }


    const handleLogin = (username, password) => {
        if (user.username === username && user.password === password){
            // Na produkci změnit secure na true pro HTTPS!
            if(rememberMe){
                Cookies.set("user_session", username, {expires: 7, secure: false, })
            }
            else {
                Cookies.set("user_session", username, { secure: false })

            }

            router.push("/")
            showToast.success(`Vítej ${user.username}!`, {
                duration: 3000,
                position: "top-center"
            })
        }  
        else {
            showToast.error("Chybné údaje!", {
                duration: 3000,
                position: "top-center"
            })
        }
    }

    return(
        <div>
            <Container title="Přihlášení">
                <div className="flex flex-col flex-1 gap-30 my-10">
                    <Headline title={"Školní informační systém"}></Headline>
                    <LoginForm 
                        setUsername={onChangeUsername} 
                        setPassword={onChangePassword} 
                        username={username} 
                        password={password} 
                        handleLogin={()=> handleLogin(username, password)}
                        rememberMe={rememberMe}
                        setRememberMe={onChangerRememberMe}
                            
                    >
                    </LoginForm>
                </div>
            </Container>
        </div>
    )
}