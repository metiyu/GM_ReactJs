import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import CardList from '../components/CardList';
import { ALL_ANIME } from '../lib/queries/AllAnime';
import { ViewGridIcon, MenuIcon } from "@heroicons/react/solid"
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function Home() {

    const [page, setPage] = useState(1)

    const { loading, error, data } = useQuery(ALL_ANIME, {
        variables: {
            page: page,
            perPage: 10,
        }
    })

    const allAnime = !loading ? data.Page.media : ""

    function paginate() {

    }

    if (loading) {
        return <div>Loading...</div>
    }
    else {
        return (
            <NavBar>
                {allAnime.map((anime, id) => {
                    return <CardList children={anime}></CardList>
                })}
                <div className="flex justify-between">
                    {page <= 1 ? (
                        <button onClick={() => setPage((page) => page - 1)}>
                            <p className="pl-2 font-bold text-xl">⇐</p>
                        </button>
                    ) : ""}
                    <span>Page {page}</span>
                    <button onClick={() => setPage((page) => page + 1)}>
                        <p className="pr-2 font-bold text-xl">⇒</p>
                    </button>
                </div>
            </NavBar>
        )
    }

}