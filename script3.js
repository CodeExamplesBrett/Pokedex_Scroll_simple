let pokemons = ['pikachu','charmander','piplup','squirtle','mew','eevee','snorlax','charizard']

async function loadPokemon() {

    for (let i = 0; i < pokemons.length; i++) {
        const dynamic_url = `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('loaded Pokemon', currentPokemon);
        
        //console.log(dynamic_url)
    }
}