import { use, useState } from "react"
import categoryOptions from "@/js/categoryOptions"

export default function Form({onAddPost, closeForm}){
    const [name, setName] = useState("") || null
    const [post, setPost] = useState("") || null
    const [categories, setCategories] = useState(categoryOptions) 
    const [categoriesActive, setCategoriesActive] = useState(false)
    const [category, setCategory] = useState("Kategorie")

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangePost = (e) => {
        setPost(e.target.value)
    }

    const toggleActive = () => {
        setCategoriesActive(!categoriesActive)
    }

    const handleSubmit = ()=>{
        onAddPost({
            name: name,
            post: post,
            category: category
        })

        setName("")
        setPost("")
        closeForm();
    }
    
    return(
        <div className="flex flex-col gap-2 border-gray-300 border-1 p-3 rounded-2xl">
            <div className="flex gap-10">
                <input className="border-1 px-2 border-gray-300 w-1/3 rounded-xl" type="text" value={name} onChange={onChangeName} placeholder="Název příspěvku"/>
                {!categoriesActive && (
                <button 
                    className="border-1 px-5 text-orange-500 font-black rounded-full"
                    onClick={toggleActive}
                    >
                        {category}
                        </button>
                )}
                {
                    categoriesActive && (
                        <div className="flex gap-5">
                        {categories.map((category, index)=> (
                            <button 
                                key={index}
                                className="border-1 px-5 border-gray-300 rounded-xl"
                                onClick={()=> {
                                    setCategory(category)
                                    toggleActive()
                                }
                            }>{category}</button>
                        ))}
                        
                        </div>
                        
                    )
                }
            </div>
            <textarea className="border-1 h-30 px-2 text-wrap border-gray-300 rounded-xl" value={post} onChange={onChangePost} placeholder="Obsah příspěvku ..."/>
            <button 
                className="border-1 py-2 rounded-2xl text-white bg-green-500 hover:bg-green-600 cursor-pointer"
                onClick={handleSubmit}
            > 
                Zveřejnit příspěvek
            </button>
        </div>
    )
}