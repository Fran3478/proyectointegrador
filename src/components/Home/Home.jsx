import Cards from "../Cards/Cards";
export default function Home(props){

    return (
        <div>
            <Cards characters={props.characters} onClose={props.onClose}/>
        </div>
    )
}