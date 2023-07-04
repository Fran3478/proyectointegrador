import SearchBar from '../searchBar/SearchBar';

function Nav(props) {
    return (
        <div>
            <SearchBar onSearch={props.onSearch} />
        </div>
    )
}

export default Nav