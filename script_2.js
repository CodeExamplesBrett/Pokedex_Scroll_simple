let currentPokemon;
let pokemons = ['pikachu','charmander','piplup','squirtle','mew','eevee','snorlax','charizard']

       //pikachu charmander piplup squirtle mew eevee snorlax charizard garchomp lucario

        async function loadPokemon() {
            let url_pikachu = 'https://pokeapi.co/api/v2/pokemon/eevee';
            let response = await fetch(url_pikachu);
            Pokemon_Pikachu = await response.json();
            console.log('loaded Pokemon', Pokemon_Pikachu);

            renderPokemonInfo();
            renderPokemonThumb();
        }

        function renderPokemonInfo() {
            document.getElementById('pokemonName').innerHTML = Pokemon_Pikachu['name'];
            document.getElementById('pokemonPic').src = Pokemon_Pikachu['sprites']['other']['home']['front_default'];
            document.getElementById('Id-Number').innerHTML = '#'+ Pokemon_Pikachu['id'];
            document.getElementById('type-bg').innerHTML = Pokemon_Pikachu['types'][0]['type']['name'];

        }

        function renderPokemonThumb() {
            document.getElementById('pokeThumbTitle').innerHTML = currentPokemon['name'];
            document.getElementById('type-bg-menu').innerHTML = currentPokemon['types'][0]['type']['name'];
            document.getElementById('pokemonPicMenu').src = currentPokemon['sprites']['other']['home']['front_default'];
        }

        function renderPokemonThumb() {

            let PokeMenuItem = document.getElementById('pokedex-menu');

            for (let i = 0; i < pokemons.length; i++) {
                const pokemon = pokemons[i];
                
                PokeMenuItem.innerHTML += ``
            }
        }