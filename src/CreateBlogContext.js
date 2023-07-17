import { createContext, useContext, useReducer } from "react"

const createBlogReducer=(state,action)=>{
    switch (action.type) {
        case "toggle":
            return !state
        default:
            return state
    }
}
    const CreateBlogContext = createContext()
    export const CreateBlogContextProvider = (props) => {
        const [createBlog, createBlogDispatch] = useReducer(createBlogReducer,false)

        return (
            <CreateBlogContext.Provider value = {[createBlog, createBlogDispatch]}>
                {props.children}
            </CreateBlogContext.Provider>
        )

    }

    export const useCreateBlog = ()=>{
        const createBlogandDispatch = useContext(CreateBlogContext)
        return createBlogandDispatch[0]
    }

    export const useCreateBlogDispatch = ()=>{
        const createBlogandDispatch = useContext(CreateBlogContext)
        return createBlogandDispatch[1]
    }

