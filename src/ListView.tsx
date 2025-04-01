import{ useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ListViewInit {
    dataInit: any
}

const ListView = ({ dataInit }: ListViewInit) => {
    const [data, setData] = useState<any>(dataInit);
    const [query, setQuery] = useState("")
    const [currOrder, setOrder] = useState("Ascending");
    const [sortby, setSort] = useState("Number")

    useEffect(() => {
        setData([...dataInit])
    }, [dataInit])

    useEffect(() => {
        if (query === "") {
            setData([...dataInit])
        } else {
            let temp = []
            temp = dataInit.filter((pokemon: any) => pokemon.name.includes(query))
            setData(temp)
        }
    }, [query, dataInit])

    const sortWeight = () => {
        let temp = []
        setSort("Weight")
        if (currOrder === "Ascending") {
            temp = [...data.sort((a: any, b: any) => a.details.weight - b.details.weight)]
        } else {
            temp = [...data.sort((a: any, b: any) => a.details.weight - b.details.weight).reverse()]
        }
        setData(temp)
    }
    const defaultData = () => {
        setOrder("Ascending")
        setData([...dataInit])
        console.log("sorting by index in default")
        console.log(data)
    }
    const sortName = () => {
        setSort("Name")
        let temp = []
        if (currOrder === "Ascending") {
            temp = [...data.sort((a: any, b: any) => a.name.localeCompare(b.name))]
        } else {
            temp = [...data.sort((a: any, b: any) => a.name.localeCompare(b.name)).reverse()]
        }
        setData(temp)
        console.log("sort by name")
        console.log(data)
        // console.log(filtered)
    }
    const sortId = () => {
        setSort("Number")
        let temp = []
        if (currOrder === "Ascending") {
            temp = [...data.sort((a: any, b: any) => a.index - b.index)]
        } else {
            temp = [...data.sort((a: any, b: any) => a.index - b.index).reverse()]
        }
        setData(temp)
        console.log("sort by id")
        console.log(data)
    }
    const orderReverse = () => {
        if (currOrder === "Ascending") {
            setOrder("Descending")
        } else {
            setOrder("Ascending")
        }
        let temp = [...data.reverse()]
        setData(temp)
        console.log("reverse order")
        console.log(data)
    }

    return (
        <div className="Home">
            <center>
                <header className="App-header">
                    <p>Pokédex</p>
                </header>
                <header>
                    <p>List by {sortby}</p>
                </header>
                
                <Link to="/">
                    <button className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-1 px-2 mb-2 mt-2 border border-gray-400 rounded shadow" onClick={() => defaultData()}>List</button>
                </Link>
                <span>&ensp;</span>
                <Link to="/gallery">
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">Gallery</button>
                </Link>
                <div className="search">
                    <input type="text"
                        placeholder={"Search Name"}
                        className={"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"}
                        onChange={event => setQuery(event.target.value)}
                        value={query}
                    />
                </div>
                <button onClick={() => sortId()} className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                    Reset
                </button>
                <span>&ensp;</span>
                <button onClick={() => sortWeight()} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                    Weight
                </button>
                <span>&ensp;</span>
                <button onClick={() => sortName()} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                    Name
                </button>
                <span>&ensp;</span>
                Sort by:
                <button onClick={() => orderReverse()} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                    <div>{currOrder}</div>
                </button>
                <div className="grid grid-cols-1 gap-12">
                {data.map((pokemon: any) => {
                    const firstLetter = pokemon.name.charAt(0)
                    const firstLetterCap = firstLetter.toUpperCase()
                    const remainingLetters = pokemon.name.slice(1)
                    const pokeName = firstLetterCap + remainingLetters
                    return (
                        // Flexo-Medium                
                        <Link to={`details/${pokemon.index}`}>
                            <div key={pokemon.index} className="aspect-square border border-gray-500 bg-white rounded-sm m-2 w-1/6">
                                <img className="aspect-square w-full h-full object-scale-down p-2" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={pokemon.name}></img>
                                <p className="text-sm text-gray-900 pl-12 text-left">{pokemon.number} </p>
                                <p className="text-md text-gray-900 align-center">{pokeName} </p>
                                <p className="text-md text-gray-900 align-center">Type: {pokemon.details.types[0].type.name}</p>
                                <p className="font-flexomedium text-md text-gray-900 pl-3 pt-2 ">Weight: {pokemon.details.weight / 10}kg</p>
                            </div>
                        </Link>
                    );
                })}
                </div>
            </center>
        </div>
    );
};

export default ListView;
