import React,{createContext,useState} from 'react'

export const ProductView = createContext()

export const ProductViewProvider = (props)=>{
    const [productview, setproductview] = useState("nodata")
    return (
        <ProductView.Provider value={[productview, setproductview]}>
            {props.children}
        </ProductView.Provider>
    )
}

export const Commentrefresh = createContext()

export const CommentrefreshProvider = (props)=>{
    const [commentrefresh, setcommentrefresh] = useState(1)
    return (
        <Commentrefresh.Provider value={[commentrefresh, setcommentrefresh]}>
            {props.children}
        </Commentrefresh.Provider>
    )
}