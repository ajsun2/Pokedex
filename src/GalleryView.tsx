import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface GalleryViewInit {
    dataInit: any
}

const GalleryView = ({ dataInit }: GalleryViewInit) => {
    const [data, setData] = useState<any>(dataInit);
    const [type, setType] = useState("Filter by: All")

    useEffect(() => {
        setData([...dataInit])
    }, [dataInit])
    console.log(data)
   
    const filt = (ntype: string) => {
        let temp = []
        temp = dataInit.filter((pokemon: any) => pokemon.details.types[0].type.name.includes(ntype))
        setData(temp)
        if (ntype === "") {
            setType("Filter by: All")
        } else {
            setType("Filter by: " + ntype)
        }
    }

    return (
        <div className="Home">
            <center>
                <header className="App-header">
                    <p>Pokédex</p>
                </header>
                <header>
                    <p>Gallery</p>
                </header>
                <div> {type} </div>
                <Link to="/">
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">List</button>
                </Link>
                <span>&ensp;</span>
                <Link to="/gallery">
                    <button className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-1 px-2 mb-2 mt-2 border border-gray-400 rounded shadow">Gallery</button>
                </Link>
                <p>
                    <button onClick={() => filt("")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        All
                    </button>
                    <button onClick={() => filt("normal")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Normal
                    </button>
                    <button onClick={() => filt("grass")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Grass
                    </button>
                    <button onClick={() => filt("fire")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Fire
                    </button>
                    <button onClick={() => filt("water")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Water
                    </button>
                    <button onClick={() => filt("bug")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Bug
                    </button>
                    <button onClick={() => filt("electric")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Electric
                    </button>
                    <button onClick={() => filt("ground")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Ground
                    </button>
                    <button onClick={() => filt("poison")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Poison
                    </button>
                    <button onClick={() => filt("ghost")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Ghost
                    </button>
                    <button onClick={() => filt("steel")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Steel
                    </button>
                    <button onClick={() => filt("rock")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Rock
                    </button>
                    <button onClick={() => filt("psychic")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Psychic
                    </button>
                    <button onClick={() => filt("dragon")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Dragon
                    </button>
                    <button onClick={() => filt("fairy")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Fairy
                    </button>
                    <button onClick={() => filt("ice")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Ice
                    </button>
                    <button onClick={() => filt("fighting")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Fighting
                    </button>
                    <button onClick={() => filt("dark")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                        Dark
                    </button>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg gap-12">
                    {data.map((pokemon: any) => {
                        const imgUrl = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`;
                        return (
                            <Link to={`/details/${pokemon.index}`}>
                                <div key={pokemon.index} className="m-4 flex justify-center items-center border border-gray-500 bg-white rounded-sm aspect-square hover:opacity-70 hover: cursor-pointer">
                                    <img className="p-2 w-full h-full object-scale-down" src={imgUrl} alt="Pokemon"></img>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </center>
        </div>
    );
};

export default GalleryView;