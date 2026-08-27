// utils 「何度も使う処理や、コンポーネントから切り離した処理を置いておく場所」

export const getAllPokemon = async (url: string) => {
  const res = await fetch(url); // fetch(url) → Promiseが返ってくる // await → Promiseの処理が終わるまで待って、結果をresに入れる
  const data = await res.json(); // res.json() → Promiseが返ってくる // await → JSONをJavaScriptで扱えるデータに変換した結果をdataに入れる

  return data;
};

export const getPokemon = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};
