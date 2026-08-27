import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./Components/Card/Card";
import type { Pokemon } from "./types/Pokemon";
import type { PokemonData } from "./types/Pokemon";
import NavBar from "./Components/Navbar/NavBar";

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]); // Pokemon一つ一つのデータを管理
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  // 一つ一つのポケモンを取り出す関数
  const loadPokemon = async (data: PokemonData[]) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    );
    setPokemonData(_pokemonData);
  };

  // リロード時にAPIを取得したいのでuseEffectを使用する
  useEffect(() => {
    const fetchPokemonAPI = async () => {
      const res = await getAllPokemon("https://pokeapi.co/api/v2/pokemon/"); // APIを取得する
      loadPokemon((res as { results: PokemonData[] }).results); // resの中のresultプロパティを配列で受け取ってくださいという記述。
      // resにPokeAPIから受け取ったデータが格納されている .resultでアクセスする
      setLoading(false);

      setNextUrl(res.next); // nextに次のページのデータが格納されている。
    };

    fetchPokemonAPI();
  }, []);

  // 次のページのポケモンを取得する
  const nextPageButton = async () => {
    setLoading(true);

    const data = await getAllPokemon(nextUrl);
    await loadPokemon((data as { results: PokemonData[] }).results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // 前のページのポケモンを取得する
  const prevPageButton = async () => {
    if (!prevUrl) return;

    setLoading(true);

    const data = await getPokemon(prevUrl);
    await loadPokemon((data as { results: PokemonData[] }).results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      {loading ?
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      : <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} />
            ))}
          </div>
          <div className="btn">
            <button onClick={prevPageButton}>前へ</button>
            <button onClick={nextPageButton}>次へ</button>
          </div>
        </>
      }
    </>
  );
}

export default App;
