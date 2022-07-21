import { useQuery } from '@apollo/client';
import CardList from '../components/CardList';
import { ALL_ANIME } from '../lib/queries/AllAnime';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Loader from "react-js-loader"
import { useEffect } from 'react';
import { THEME, useTheme } from '../lib/Theme';

export default function Home() {
    const [page, setPage] = useState(1)
    const { loading, error, data } = useQuery(ALL_ANIME, {
        variables: {
            page: page,
            perPage: 10,
        }
    })

    const allAnime = !loading ? data.Page.media : ""

    const themeList = [{id: 1, name: "Light"}, 
                        {id: 2, name: "Dark"}]
    const {currTheme, setCurrTheme} = useTheme()
    const [theme, setTheme] = useState(currTheme.name == "Light" ? 1 : 2)

    function changeTheme(e){
        console.log(e.target.value);
        if(e.target.value == 1){
            setCurrTheme(THEME.light)
            setTheme(1)
        }
        else if(e.target.value == 2){
            setCurrTheme(THEME.dark)
            setTheme(2)
        }
    }

    if (loading) {
        return <div className="absolute left-0 right-0 bottom-0 top-72" style={{backgroundColor: currTheme.background}}>
            <Loader type="spinner-circle" bgColor={currTheme.fontColor} title={"spinner-circle"} size={200} />
        </div>
    }
    else {
        return (
            <NavBar>
                <div className="flex justify-center">
                    <p style={{color: currTheme.fontColor}}>Theme</p>
                    <select name="theme" id="theme" value={theme} onChange={(e) => changeTheme(e)} style={{color: currTheme.fontColor, backgroundColor: currTheme.backdrop}}>
                        {themeList.map((theme) => (
                            <option key={theme.id} value={theme.id}>{theme.name}</option>
                        ))}
                    </select>
                </div>
                {allAnime.map((anime, id) => {
                    return <CardList children={anime}></CardList>
                })}
                <div className="flex justify-between">
                    {page > 1 ? (
                        <button onClick={() => setPage((page) => page - 1)}>
                            <p className="pl-2 font-bold text-xl">⇐</p>
                        </button>
                    ) : (
                        <span className="pl-2">
                            <p className="pl-3 font-bold text-xl"></p>
                        </span>
                    )}
                    <span>Page {page}</span>
                    <button onClick={() => setPage((page) => page + 1)}>
                        <p className="pr-1 font-bold text-xl">⇒</p>
                    </button>
                </div>
            </NavBar>
        )
    }
}