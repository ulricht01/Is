export default function Title({title, description} : {title : string, description : string}){
    return (
        <div className="flex flex-col pt-8 gap-2">
            <p className="font-black text-3xl">{title}</p>
            <p className="text-gray-500 text-sm">{description}</p>
        </div>
    )
}