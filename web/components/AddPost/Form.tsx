import { use, useState } from "react"

export default function Form(){
    const [name, setName] = useState("") || null
    const [post, setPost] = useState("") || null

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangePost = (e) => {
        setPost(e.target.value)
    }
    
    return(
        <div className="flex flex-col gap-2 border-gray-300 border-1 p-3 rounded-2xl">
            <div className="flex gap-10">
                <input className="border-1 px-2 border-gray-300 w-1/3 rounded-xl" type="text" value={name} onChange={onChangeName} placeholder="Název příspěvku"/>
                <button className="border-1 px-5 border-gray-300 rounded-xl">Kategorie</button>
            </div>
            <textarea className="border-1 h-30 px-2 text-wrap border-gray-300 rounded-xl" value={post} onChange={onChangePost} placeholder="Obsah příspěvku ..."/>
        </div>
    )
}