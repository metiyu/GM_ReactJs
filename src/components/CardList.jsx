import { useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/Theme';

export default function CardList({ children, ...attr }) {
    const navigate = useNavigate()
    function gotoDetail(id) {
        console.log(id);
        navigate(`/${id}`)
    }

    const {currTheme, setCurrTheme} = useTheme()

    return (
        <div className="bg-white shadow-lg w-full border " onClick={() => gotoDetail(children.id)} style={{backgroundColor: currTheme.background}}>
            <div className="md:flex px-4 leading-none max-w-4xl">
                <div className="flex-col">
                    <div className="pt-3">
                        <img
                            // src={sharp(children.coverImage.large).rotate().toFile('output.webp')}
                            src={children.coverImage.large}
                            alt="pic"
                            className="h-36 w-28 rounded-md border-4 border-gray-300 shadow-lg"
                        />
                    </div>
                    <p className="pt-4 text-lg font-bold break-all max-w-screen-sm" style={{color: currTheme.defaultFont}}>{children.title.romaji} ({children.seasonYear})</p>
                    <hr className="hr-text" data-content="" />
                    <div className="text-md flex px-4 my-2">
                        <span className="font-bold" style={{color: currTheme.defaultFont}}>Genre: </span>
                        <span className="pl-2" style={{color: currTheme.defaultFont}}>{children.genres.map((genre) => genre + ", ")}</span>
                    </div>
                    <p className="flex text-md px-4 my-2">
                        <span className="font-bold pr-1" style={{color: currTheme.defaultFont}}>Rating:</span>
                        <span style={{color: currTheme.defaultFont}}>{(children.averageScore / 10)}/10</span>
                        <span className="font-bold px-2" style={{color: currTheme.defaultFont}}>|</span>
                        <span className="font-bold pr-1" style={{color: currTheme.defaultFont}}>Episodes:</span>
                        <span style={{color: currTheme.defaultFont}}>{children.episodes ? children.episodes : "-"}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}