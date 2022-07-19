import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import CardList from '../components/CardList';
import { ALL_ANIME } from '../lib/queries/AllAnime';
import { ViewGridIcon, MenuIcon } from "@heroicons/react/solid"
import { useState } from 'react';

export default function Home() {

    const { loading, error, data } = useQuery(ALL_ANIME, {
        variables: {
            page: 1,
            perPage: 10,
        }
    })

    const allAnime = !loading ? data.Page.media : ""
    const [showType, setShowType] = useState("list")

    if (loading) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div>
                <div className="absolute right-1 top-0">
                    <div className="flex">
                        <button onClick={() => setShowType("grid")}><ViewGridIcon className="h-6 w-6" /></button>
                        <button onClick={() => setShowType("list")}><MenuIcon className="h-6 w-6" /></button>
                    </div>
                </div>
                {allAnime.map((anime, id) => {
                    if(showType === "list"){
                        return <CardList children={anime}></CardList>
                    }
                    else{
                        return <div></div>
                    }
                })}
            </div>
        )
    }

}