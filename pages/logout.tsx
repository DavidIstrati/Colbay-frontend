import { NextPage } from "next"
import Router from "next/router"
import { useEffect } from "react"
import { useAuth } from "../helpers"

const Login: NextPage = () => {
    const {logout} = useAuth()
    useEffect(()=>
    {
        logout()
        Router.push("/login");
    })
    return(
        <></>
    )
}

export default Login;