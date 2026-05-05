export default function Title({title, description} : {title : string, description : string}){
    return (
        <div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}