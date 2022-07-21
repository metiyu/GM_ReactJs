import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GET_ANIME } from "../lib/queries/GetAnime"
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import Loader from "react-js-loader"
import { useTheme } from "../lib/Theme";

export default function DetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [favorites, setFavorites] = useState([])
    const getArray = JSON.parse(localStorage.getItem("favorites") || "0")
    const { currTheme, setCurrTheme } = useTheme()

    useEffect(() => {
        if (getArray !== 0) {
            setFavorites([...getArray])
        }
    }, [])

    function changeColor(props, item) {
        let array = favorites
        let addArray = true
        array.map((item, key) => {
            if (item === props) {
                array.splice(key, 1)
                addArray = false
            }
        })
        if (addArray) {
            array.push(props)
        }
        setFavorites([...array])

        localStorage.setItem("favorites", JSON.stringify(favorites))

        var storage = localStorage.getItem("favItem" + (item) || '0')
        if (storage == null) {
            localStorage.setItem(("favItem" + (props)), JSON.stringify(item))
        }
        else {
            localStorage.removeItem("favItem" + (props))
        }
    }

    const { loading, error, data } = useQuery(GET_ANIME, {
        variables: {
            id: id,
        }
    })

    console.log(currTheme);

    if (loading) {
        return <div className="flex w-screen h-screen" style={{ backgroundColor: currTheme.background }}>
            <div className="absolute left-0 right-0 bottom-0 top-72">
                <Loader type="spinner-circle" bgColor={currTheme.fontColor} size={200} />
            </div>
        </div>
    }
    else if (data === undefined) {
        return <div>
            <div className="absolute left-0 pt-2 pl-1" style={{ backgroundColor: currTheme.background }}>
                <button onClick={() => navigate(-1)} style={{ color: currTheme.defaultFont }}>
                    Back
                </button>
            </div>
            <img src="https://i.stack.imgur.com/6M513.png" alt="" />
        </div>
    }
    else {
        return <div className="grid">
            <div className="flex justify-center" style={{ backgroundColor: currTheme.backdrop }}>
                <div className="absolute left-0 pt-2 pl-1" >
                    <button onClick={() => navigate(-1)} style={{ color: currTheme.defaultFont }}>
                        Back
                    </button>
                </div>
                <div className="w-64" >
                    <h5 className="py-2 text-lg font-bold break-all max-w-screen-sm" style={{ color: currTheme.defaultFont }}>{data.Media.title.romaji}</h5>
                </div>
                <div className="absolute right-0 pr-2 pt-5">
                    <button onClick={() => changeColor(id, data.Media)}>
                        {favorites.includes(id) ? (
                            <RiHeartFill className="w-5 h-5" color="red"></RiHeartFill>
                        ) : (
                            <RiHeartLine className="w-5 h-5" ></RiHeartLine>
                        )}
                    </button>
                </div>
            </div>
            <div style={{ backgroundColor: currTheme.background }}>
                <hr className="border-1 border-gray-300" />
                <div className="py-2 flex justify-center" >
                    <img src={data.Media.coverImage.large}
                        alt="pic"
                        className="h-72 rounded-md border-4 border-gray-300 shadow-lg" />
                </div>
                <div className="px-6">
                    <div className="py-1">
                        <hr className="border-1 border-gray-300" />
                    </div>
                    <div>
                        <p className="font-bold text-lg underline" style={{ color: currTheme.defaultFont }}>Scores</p>
                        <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Rating:
                            <p className="pl-1 font-medium" >{data.Media.averageScore / 10}/10</p>
                        </p>
                        <p className="flex font-bold"style={{ color: currTheme.defaultFont }}>Trend:
                            <p className="pl-1 font-medium">#{data.Media.trending}</p>
                        </p>
                        <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Ranked:
                            <p className="pl-1 font-medium">#{data.Media.rankings[0].rank}</p>
                        </p>
                    </div>
                    <div className="py-1">
                        <hr className="border-1 border-gray-300" />
                    </div>
                </div>
                <div className="px-6">
                    <p className="font-bold text-lg underline" style={{ color: currTheme.defaultFont }}>Alternative Titles</p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Japanese:
                        <p className="pl-1 font-normal">{data.Media.title.native}</p>
                    </p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>English:
                        <p className="pl-1 font-normal">{data.Media.title.romaji}</p>
                    </p>
                    <div className="py-1">
                        <hr className="border-1 border-gray-300" />
                    </div>
                    <p className="font-bold text-lg underline" style={{ color: currTheme.defaultFont }}>Synopsis</p>
                    <p style={{ color: currTheme.defaultFont }}>{data.Media.description}</p>
                    <div className="py-1">
                        <hr className="border-1 border-gray-300" />
                    </div>
                    <p className="font-bold text-lg underline" style={{ color: currTheme.defaultFont }}>Information</p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Producers:
                        <p className="pl-1 font-normal" >{data.Media.studios.edges.map((studio) => studio.node.name + ", ")}</p>
                    </p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Source:
                        <p className="pl-1 font-normal">{data.Media.source}</p>
                    </p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Genres:
                        <p className="pl-1 font-normal">{data.Media.genres.map((genre) => genre + ", ")}</p>
                    </p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Episodes:
                        <p className="pl-1 font-normal">{data.Media.episodes}</p>
                    </p>
                    <p className="flex font-bold" style={{ color: currTheme.defaultFont }}>Duration:
                        <p className="pl-1 font-normal">{data.Media.duration} min.</p>
                    </p>
                    <div className="py-1">
                        <hr className="border-1 border-gray-300" />
                    </div>
                    <p className="font-bold" style={{ color: currTheme.defaultFont }}>Characters & Voice Actors</p>
                    {data.Media.characters.edges.map((char) => (
                        <div className="flex">
                            <div className="flex left-0 w-56">
                                <img src={char.node.image.large}
                                    alt=""
                                    className="h-28 rounded-md border-4 border-gray-300 shadow-lg"
                                />
                                <p className="flex-wrap" style={{ color: currTheme.defaultFont }}>{char.node.name.userPreferred}</p>
                            </div>
                            <div className="absolute right-0">
                                <div className="flex">
                                    <p className="pt-20" style={{ color: currTheme.defaultFont }}>{char.voiceActors[0].name.userPreferred}</p>
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
        </div>
    }
}