import { useCallback } from 'react';
import { useState } from 'react';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function CardList({ children, ...attr }) {
    const [toggleHeart, setToggleHeart] = useState(false)
    const [items, setItems] = useState([])

    function changeColor(e) {
        setToggleHeart(!toggleHeart)
        setItems(items.push(e.id))
        console.log(items)
        localStorage.setItem("ItemID", items)
    }

    const navigate = useNavigate()
    function gotoDetail(id){
        console.log(id);
        navigate(`/${id}`)
    }

    return (
        // <div className="w-full max-h-screen grid place-items-center bg-red-900">
            <div className="bg-red-500 shadow-lg w-full border " onClick={() => gotoDetail(children.id)}>
                <div className="md:flex px-4 leading-none max-w-4xl">
                    <div className="flex-col">
                        <div className="pt-3">
                            {/* <ImgWithFallback src={children.coverImage.large} /> */}
                            <img

                                // src={sharp(children.coverImage.large).rotate().toFile('output.webp')}
                                src={children.coverImage.large}
                                alt="pic"
                                className="h-36 w-28 rounded-md border-4 border-gray-300 shadow-lg"
                            />
                        </div>
                        <p className="pt-4 text-lg font-bold break-all max-w-screen-sm">{children.title.romaji} ({children.seasonYear})</p>
                        <hr className="hr-text" data-content="" />
                        <div className="text-md flex px-4 my-2">
                            <span className="font-bold">Genre: </span>
                            <span className="pl-2">{children.genres.map((genre) => genre + ", ")}</span>
                        </div>
                        <p className="hidden md:block px-4 my-4 text-sm text-left">In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker. </p>

                        <p className="flex text-md px-4 my-2">
                            <span className="font-bold pr-1">Rating:</span>{(children.averageScore / 10)}/10
                            <span className="font-bold px-2">|</span>
                            <span className="font-bold">Episodes:</span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center px-4 mb-4 w-full">
                    <div className="flex">
                        {/* <button><HeartIconOutline className="h-5 w-5"></HeartIconOutline></button> */}
                        <button onClick={() => changeColor(children)}>
                            {toggleHeart ? (
                                <RiHeartFill color="red"></RiHeartFill>
                            ) : (
                                <RiHeartLine ></RiHeartLine>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        // </div>
    )
}