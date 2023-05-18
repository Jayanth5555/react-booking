import { useReducer, createContext } from "react";


const INITAL_STATE ={
    city:undefined,
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    },
};

export const SearchContext = createContext(INITAL_STATE)

const SearchReducer= (state,action) =>{
    switch(action.type){
        case"NEW_SEARCH":
        return action.payload
        case "REST_SEARCH":
            return INITAL_STATE
            default:
                return state;
    }
};
export const SearchContextProvider = ({children}) => {
    const [state, dispatch]= useReducer(SearchContext, INITAL_STATE);
    
    return(
        <SearchContext.Provider 
        value={{city:state.city,
            dates:state.dates,
            options:state.options,dispatch,
        }}>
            {children}
        </SearchContext.Provider>
    )


}