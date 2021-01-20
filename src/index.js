import React, { useState, useEffect } from "react"
import reactDOM from "react-dom"

const  GithubUser = ({ username }) => {
    const [ userInfo, setUserInfo ] = useState(null)

    useEffect(() => {
       fetch(`https://api.github.com/users/${username}`)
       .then(res => res.json())
       .then(setUserInfo)
    }, [ username ])

    return userInfo ? <pre style={{margin: "2em auto", width: "50vw"}}>{JSON.stringify(userInfo, null, 4)}</pre>: "User data hasn't loaded yet."
}

reactDOM.render(<GithubUser username="xtropia"/>, document.querySelector("#app"))
