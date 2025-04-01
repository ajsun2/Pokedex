import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

interface DetailViewInit {
    dataInit: any
}

const DetailView = ({ dataInit }: DetailViewInit) => {
    let { index } = useParams();
    const [data, setData] = useState<any>(dataInit);

    useEffect(() => {
        setData([...dataInit])
    }, [dataInit])

    const getDataIndex = (data: any) => {
        for (var i = 0; i < data.length; i++)
            if (data[i].index === index)
                return i;
        return -1;
    }
    
    let poke = data.find((pokemon: any) => pokemon.index === index)
    let pos = getDataIndex(data)
    const imgUrl = `https://img.pokemondb.net/artwork/large/${poke.name}.jpg`;

    let prev = Math.max(0, pos - 1)
    let next = Math.min(data.length - 1, pos + 1)

    const firstLetter = poke.name.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = poke.name.slice(1)
    const pokeName = firstLetterCap + remainingLetters
    return (
        <div className="Home">
            <center>
                <header className="App-header">
                    <p>Pokédex</p>
                </header>
                <header>
                    <p>Detail View</p>
                </header>
                <Link to="/">
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">List</button>
                </Link>
                <span>&ensp;</span>
                <Link to="/gallery">
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">Gallery</button>
                </Link>
                <div className="flex justify-center">
                    <Link to={`/details/${data[prev].index}`} className="pr-8 pt-2">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Prev
                        </button>
                    </Link>
                    <div className="border border-gray-500 bg-white rounded-sm m-2 w-1/3" >
                        <img className="p-2 aspect-square w-full h-full object-scale-down" src={imgUrl} alt="Pokemon"></img>

                    </div>
                    <Link to={`/details/${data[next].index}`} className="pl-8 pt-2">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </Link>
                </div>
                <span className="">&nbsp;&nbsp;{poke.number}</span>
                <p className="text-6xl pt-0">{pokeName}</p>
                <span className="font-flexomedium text-md text-gray-900 pl-3 pt-2" >Type: </span> <span className="border border-gray-500 bg-white font-flexomedium text-md pt-0 w-1/8 rounded-sm"> {poke.details.types[0].type.name}</span>
                <div></div>
                <span className="font-flexomedium text-md text-gray-900 pl-3 pt-2 ">Abilities: </span>
                {poke.details.abilities.map((ability: any) => {
                    return (
                        <span className="font-flexomedium text-md text-gray-900 border border-gray-500 bg-white font-flexomedium text-md pt-0 w-1/8 rounded-sm">{ability.ability.name}</span>
                    );
                })}
                <p className="font-flexomedium text-md text-gray-900 pl-3 pt-2 ">Weight: {poke.details.weight / 10}kg</p>
                <p className="font-flexomedium text-md text-gray-900 pl-3 pt-2 ">Height: {poke.details.height / 10}cm</p>
                <br></br>
                <span>Moves: </span>
                {poke.details.moves.map((move: any) => {
                    return (
                        <p className="">{move.move.name}</p>
                    );
                })}
            </center>
        </div>
    );
};

export default DetailView;