import CardList from '../components/CardList';
import NavBar from '../components/NavBar';
import { useTheme } from '../lib/Theme';

export default function Favorite() {
    const getArray = JSON.parse(localStorage.getItem("favorites") || "0")
    var favList = []
    for (let index = 0; index < getArray.length; index++) {
        let x = getArray[index]
        favList[index] = JSON.parse(localStorage.getItem('favItem' + [x]) || '')
    }

    if (favList.length == 0) {
        return (
            <NavBar></NavBar>
        )
    }
    else {
        return (
            <NavBar>
                {favList.map((anime, id) => {
                    return <CardList children={anime}></CardList>
                })}
            </NavBar>
        )
    }
}