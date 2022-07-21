import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useParams } from "react-router-dom"
import CardList from "../components/CardList"
import NavBar from "../components/NavBar"
import { SEARCH_ANIME } from "../lib/queries/SearchAnime"
import Loader from "react-js-loader"

export default function Search() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [input, setInput] = useState("")

    const { loading, error, data } = useQuery(SEARCH_ANIME, {
        variables: {
            page: page,
            perPage: 10,
            search: search
        }
    })

    const allAnime = !loading ? data.Page.media : ""

    if (loading) {
        return <div className="absolute left-0 right-0 bottom-0 top-72">
            <Loader type="spinner-circle" bgColor={"#000000"} title={"spinner-circle"} size={200} />
        </div>
    }
    else {
        return (
            <NavBar>
                <div className="grid justify-center pb-4 gap-2">
                    <p className="text-center">Input your Anime Title</p>
                    <input value={input} type="anime" onChange={(e) => setInput(e.target.value)} />
                    <button className="bg-indigo-400 hover:bg-indigo-500"
                        onClick={() => setSearch(input)}>Search</button>
                </div>
                {allAnime.map((anime, id) => {
                    return <CardList children={anime}></CardList>
                })}
                {search !== "" ? (
                    <div className="flex justify-between">
                        {page > 1 ? (
                            <button onClick={() => setPage((page) => page - 1)}>
                                <p className="pl-2 font-bold text-xl">⇐</p>
                            </button>
                        ) : (
                            <span>
                                <p className="pl-3 font-bold text-xl"></p>
                            </span>
                        )}
                        <span>Page {page}</span>
                        <button onClick={() => setPage((page) => page + 1)}>
                            <p className="pr-2 font-bold text-xl">⇒</p>
                        </button>
                    </div>
                ) : ""}
            </NavBar>
        )
    }
}