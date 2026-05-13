export default function Post({name, category, time, title, message} : {name : string, category : string, time : Date, title : string, message : string}){
    return (
        <div className="flex flex-col border-1 p-5 rounded-2xl border-gray-300">
            <div className="flex items-center gap-5">
                <img src="/example.png" alt="img.png" className="w-15 h-15"></img>
                <p className="font-black">{name}</p>
                <p className="text-orange-500 font-black border-1 px-3 rounded-full">{category}</p>
                <p className="text-gray-400">{time}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-xl font-black">{title}</p>
                <pre className="font-sans">{message}</pre>
            </div>
        </div>
    )
}