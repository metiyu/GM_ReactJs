import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { GET_ANIME } from "../lib/queries/GetAnime"

export default function DetailPage() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_ANIME, {
        variables: {
            id: id,
        }
    })

    if (loading) {
        return <div>Loading...</div>
    }
    else {
        return <div className="grid">
            <hr className="border-1 border-gray-300" />
            <div className="flex justify-center">
                <div className="absolute left-0 pt-2 pl-1">
                    <a href="/">
                        Back
                    </a>
                </div>
                <div className="w-64">
                    <h5 className="py-2 text-lg font-bold break-all max-w-screen-sm">{data.Media.title.romaji}</h5>
                </div>
            </div>
            <hr className="border-1 border-gray-300" />
            <div className="py-2 flex justify-center">
                <img src={data.Media.coverImage.large}
                    alt="pic"
                    className="h-72 rounded-md border-4 border-gray-300 shadow-lg" />
            </div>
            <div className="px-6">
                <div className="py-1">
                    <hr className="border-1 border-gray-300" />
                </div>
                <div>
                    <p className="font-bold">Scores</p>
                    <p className="flex">Rating:
                        <p className="pl-1 font-bold">{data.Media.averageScore / 10}/10</p>
                    </p>
                    <p className="flex">Trend:
                        <p className="pl-1 font-bold">#{data.Media.trending}</p>
                    </p>
                    <p className="flex">Ranked:
                        <p className="pl-1 font-bold">#{data.Media.rankings[0].rank}</p>
                    </p>
                </div>
                <div className="py-1">
                    <hr className="border-1 border-gray-300" />
                </div>
            </div>
            <div className="px-6">
                <p className="font-bold">Alternative Titles</p>
                <p>Japanese: {data.Media.title.native}</p>
                <p>English: {data.Media.title.romaji}</p>
                <div className="py-1">
                    <hr className="border-1 border-gray-300" />
                </div>
                <p className="font-bold">Synopsis</p>
                <p>{data.Media.description}</p>
                <div className="py-1">
                    <hr className="border-1 border-gray-300" />
                </div>
                <p className="font-bold">Information</p>
                <p>Producers: {data.Media.studios.edges.map((studio) => studio.node.name + ", ")}</p>
                <p>Source: {data.Media.source}</p>
                <p>Genres: {data.Media.genres.map((genre) => genre + ", ")}</p>
                <p>Episodes: {data.Media.episodes}</p>
                <p>Duration: {data.Media.duration} min.</p>
                <div className="py-1">
                    <hr className="border-1 border-gray-300" />
                </div>
                <p className="font-bold">Characters & Voice Actors</p>
                {data.Media.characters.edges.map((char) => (
                    <div className="flex">
                        <div className="flex left-0 w-56">
                            <img src={char.node.image.large}
                                alt=""
                                className="h-28 rounded-md border-4 border-gray-300 shadow-lg"
                            />
                            <p className="flex-wrap">{char.node.name.userPreferred}</p>
                        </div>
                        <div className="absolute right-0">
                            <div className="flex">
                                <p className="pt-20">{char.voiceActors[0].name.userPreferred}</p>
                                <img src={char.voiceActors[0].image.large}
                                    alt=""
                                    className="h-28 rounded-md border-4 border-gray-300 shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="py-1">
                    <hr className="border-1 border-gray-300" />
                </div>
            </div>
        </div>
    }

}