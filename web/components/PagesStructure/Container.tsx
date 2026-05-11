export default function Container({title, children} : {title: string, children: React.ReactNode}){
    return (
        <div>
            <p className="w-4/5 mx-auto py-5 font-black text-2xl text-orange-400">{title}</p>
            <hr className="text-gray-300"/>
            <div className="mx-auto flex flex-col w-4/5 gap-5">
                {children}
            </div>
        </div>
    )
}