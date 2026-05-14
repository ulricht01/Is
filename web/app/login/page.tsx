"use client"

import Container from "@/components/PagesStructure/Container"
import { useState } from "react"
import LoginForm from "@/components/Login/LoginForm";

export default function Login(){

    const [toggleLogin, setToggleLogin] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassowrd = (e) => {
        setPassword(e.target.value)
    }


    const handleLogin = () => {
        console.log("Not implemented")    
    }
    
    return(
        <Container title="Přihlášení">
            <LoginForm setUsername={onChangeUsername} setPassword={onChangePassowrd} username={username} password={password} handleLogin={handleLogin}></LoginForm>
            
        </Container>
    )
}