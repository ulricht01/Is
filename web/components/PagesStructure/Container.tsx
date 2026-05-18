export default function Container({title, children} : {title: string, children: React.ReactNode}){
    return (
        // Přidáno min-h-screen (minimální výška přes celou obrazovku) a flex flex-col
        <div className="min-h-screen flex flex-col">
            <p className="w-4/5 mx-auto py-5 font-black text-2xl text-orange-400">{title}</p>
            <hr className="text-gray-300"/>
            
            {/* Přidáno flex-1, které způsobí, že div vyroste a zabere veškeré zbývající místo */}
            <div className="mx-auto flex flex-col w-4/5 gap-5 flex-1 py-5">
                {children}
            </div>
        </div>
    )
}