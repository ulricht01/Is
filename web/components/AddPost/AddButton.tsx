import { useState } from "react"
import Form from "./Form"

export default function AddButton({onAddPost}){
    const [active, setActive] = useState(false)

    const toggleActive = () => {
        setActive(!active)
    } 
    
    
    return(
        <>
        {
            !active && (
                <button 
                    className="border-1 py-2 rounded-2xl text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    onClick={toggleActive}
                > Přidat příspěvek
                </button>
            )
        }
        {
            active && (
                <>
                    <Form onAddPost={onAddPost} closeForm={toggleActive}>

                    </Form>
                        <button 
                            className="border-1 py-2 rounded-2xl text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
                            onClick={toggleActive}
                        > Zrušit
                        </button>
                </>
            )
        }
        </>
    )
}