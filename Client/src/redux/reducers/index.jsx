import { ADD_FAV, FILTER, ORDER, REMOVE_FAV, RESET } from "../actions/types";

const initialGlobalState = {
    myFavorites: [],
    allCharacters: []
}

export default function rootReducer(state = initialGlobalState, action){
    switch (action.type) {
        case ADD_FAV:
            return { ...state, myFavorites: action.payload, allCharacters: action.payload };
        case REMOVE_FAV:
            return { ...state, myFavorites: action.payload };
        case FILTER:
            return {...state, myFavorites: state.allCharacters.filter(char => char.gender === action.payload)}
        case ORDER:
            const aux = state.myFavorites.sort((a,b) => {
                if(action.payload === "A"){
                    if(a.id > b.id) return 1;
                    if(a.id < b.id) return -1;
                    return 0;
                } else {
                    if(a.id > b.id) return -1;
                    if(b.id > a.id) return 1;
                    return 0;
                }
            })
            return {...state, myFavorites: aux}
        case RESET:
            return {...state, myFavorites: state.allCharacters}
        default:
            return {...state}
    }
}