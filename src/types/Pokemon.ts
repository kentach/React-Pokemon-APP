export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  abilities: [
    {
      ability: {
        name: string;
      };
    },
  ];
}

export interface PokemonData {
  name: string;
  url: string;
}


export interface CardProps {
  pokemon: Pokemon;
}

