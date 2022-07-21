import { createContext, useContext, useEffect, useState } from "react"

export const THEME = {
    light:{
        name: "Light",
        background:"#FFFFFF",
        fontColor:"#312E81",
        secColor:"#4338CA",
        defaultFont: "#000000",
        backdrop: "#F3F4F6",
        default: "#FFFFFF"
    },
    dark:{
        name: "Dark",
        background:"#3F3F46",
        fontColor:"#A5B4FC",
        secColor:"#4338CA",
        defaultFont: "#FFFFFF",
        backdrop: "#27272A",
        default: "#000000"
    },
}

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) =>{

    const [currTheme,setCurrTheme] = useState(THEME.light)

    return(
    <ThemeContext.Provider value={{currTheme, setCurrTheme}}>
        {children}
    </ThemeContext.Provider>

    )
}

export const useTheme = ()=>{
    return useContext(ThemeContext)
}