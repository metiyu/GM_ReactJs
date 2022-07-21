import { useQuery } from '@apollo/client';
import CardList from '../components/CardList';
import { ALL_ANIME } from '../lib/queries/AllAnime';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Loader from "react-js-loader"

export default function Home() {
    const [page, setPage] = useState(1)
    const { loading, error, data } = useQuery(ALL_ANIME, {
        variables: {
            page: page,
            perPage: 10,
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