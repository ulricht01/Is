export default function Container({title, children} : {title: string, children: React.ReactNode}){
    return (
        <div>
            <p className="w-4/5 mx-auto">{title}</p>
            <hr/>
            <div className="mx-auto flex flex-col w-4/5">
                {children}
            </div>
        </div>
    )
}