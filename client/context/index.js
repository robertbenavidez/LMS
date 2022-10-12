import { useReducer, createContext, useEffect } from 'react';

// initial state
const initialState = {
    user: null,
}

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "Login":
            return {...state, user: action.payload};
        case "Logout":
            return {...state, user: null}
        default:
            return state
    }
}
 
// context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    useEffect(() => {
        dispatch({
            type: "Login",
            payload: JSON.parse(window.localStorage.getItem('user')),
        })
    }, [])

    return (
        <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
    )
}

export { Context, Provider };