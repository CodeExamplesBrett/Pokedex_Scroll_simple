let currentPokemon;
let currentPokemon2;

let colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    ground: '#f4e7da',
    water: '#DEF3FD',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    steel: '#8da1a0',
    dark: '#a3a1b5',
    ghost: '#ADADAD'
};

let allPokemons = []
let allPokemons2 = []


let pokemon_start = 1;
let pokemon_stop = 20;


async function loadPokemons() {

    for (let i = pokemon_start; i <= pokemon_stop; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        //push loaded Pokemons to array
        allPokemons.push(currentPokemon);
        //oder Pokemons
        sortPokemons1()
        
        //Species only required for Big card....
        const url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let response2 = await fetch(url2);
        currentPokemon2 = await response2.json();
        //push loaded Pokemons to array
        allPokemons2.push(currentPokemon2);
        //oder Pokemons
        sortPokemons2();
        renderPokemonMinis(i);
    } 
    pokemon_start += 20;
    pokemon_stop += 20;
}

function sortPokemons1() {
    allPokemons.sort(function(a, b) {
        return a.id - b.id;
    });
}

function sortPokemons2() {
    allPokemons2.sort(function(a, b) {
        return a.id - b.id;
    });
}


async function renderPokemonMinis(i) {
    
    let name = await currentPokemon['name'];
    name = await name[0].toUpperCase() + name.slice(1);
    let img = await currentPokemon['sprites']['other']['home']['front_default'];
    let type = await currentPokemon['types'][0]['type']['name'];

    document.getElementById('allPokemons').innerHTML +=
    //html code in seperate function
    renderMiniSnipet(i, name, img, type);
    
    //Type in square brackets comes from variable above (line --) colous then taken from corresponding type in Json "colors" above
    document.getElementById(`Pokemon-mini-card${i}`).style.backgroundColor = await colors[type];
    //console.log('colour', colors);
    //console.log('type', type);  
}
    
     
        /*  -------- Big-card --------- */

function selectPokemon(i, name, img, type){
    //find Pokemon within array with id of i ,  p is just a variable for Pokemon
    //myPokemon is then a JSON with all details for the current Pokemon
    let myPokemon = allPokemons.find(p => p.id == i)
    let myPokemon2 = allPokemons2.find(p => p.id == i)
    showBigCard(i, name, img, type, myPokemon, myPokemon2 )
    
}        
//render all elements of selected "Big card"
function showBigCard(i, name, img, type, myPokemon, myPokemon2) {
    //load html snipet
    document.getElementById('big-card-top').innerHTML = 
    BigCardHtmlSnipet(i, name, img, type)
    //card background color
    document.getElementById(`big-card-top`).style.backgroundColor = colors[type];

    /* ------------------- Big Card Bottom -----------*/
    renderBigCardInfo(myPokemon, myPokemon2);
    renderBigCardStatNumbers(myPokemon);
    renderBigCardProgressBars(myPokemon);
    //gray out background
    document.getElementById('bg-grey').classList.remove('d-none1');
    //console.log('type', type);

}

function renderBigCardInfo(myPokemon, myPokemon2){
    let abilities = myPokemon['abilities'][0]['ability']['name'];
    //let habitat = myPokemon['habitat']['name'];
    let height = myPokemon['height'];
    let weight = myPokemon['weight'];
    let habitat = myPokemon2['habitat']['name'];
    let species = myPokemon2['genera'][7]['genus'];
    species = species.slice(0,-8);

    document.getElementById('card-bottom-ability').innerHTML = `${abilities}`;
    document.getElementById('card-bottom-height').innerHTML = `${height}`;
    document.getElementById('card-bottom-weight').innerHTML = `${weight}`;
    document.getElementById('card-bottom-habitat').innerHTML = `${habitat}`;
    document.getElementById('card-bottom-species').innerHTML = `${species}`;
}

function renderBigCardStatNumbers(myPokemon) {
    let HP = myPokemon['stats'][0]['base_stat'];
    let attack = myPokemon['stats'][1]['base_stat'];
    let defence = myPokemon['stats'][2]['base_stat'];
    let spec_atk = myPokemon['stats'][3]['base_stat'];
    let spec_def = myPokemon['stats'][4]['base_stat'];
    let speed = myPokemon['stats'][5]['base_stat'];

    document.getElementById('stat-bottom-HP').innerHTML = `${HP}`;
    document.getElementById('stat-bottom-attack').innerHTML = `${attack}`;
    document.getElementById('stat-bottom-defence').innerHTML = `${defence}`;
    document.getElementById('stat-bottom-Sp-Attack').innerHTML = `${spec_atk}`;
    document.getElementById('stat-bottom-Sp-Defence').innerHTML = `${spec_def}`;
    document.getElementById('stat-bottom-speed').innerHTML = `${speed}`;
}

function renderBigCardProgressBars(myPokemon){
    let HP = myPokemon['stats'][0]['base_stat'];
    let attack = myPokemon['stats'][1]['base_stat'];
    let defence = myPokemon['stats'][2]['base_stat'];
    let spec_atk = myPokemon['stats'][3]['base_stat'];
    let spec_def = myPokemon['stats'][4]['base_stat'];
    let speed = myPokemon['stats'][5]['base_stat'];

    document.getElementById('progress-bar').style = `width: ${HP}%;`;
    document.getElementById('progress-bar-attack').style = `width: ${attack}%;`;
    document.getElementById('progress-bar-defence').style = `width: ${defence}%;`;
    document.getElementById('progress-bar-Sp-Attack').style = `width: ${spec_atk}%;`;
    document.getElementById('progress-bar-Sp-Defence').style = `width: ${spec_def}%;`;
    document.getElementById('progress-bar-speed').style = `width: ${speed}%;`;
}

function showInfo() {
    //toggle between info and stats
    document.getElementById('info-body').classList.remove('d-none');
    document.getElementById('stat-body').classList.add('d-none');
}

function showStats() {
    //toggle between stats and info
    document.getElementById('info-body').classList.add('d-none');
    document.getElementById('stat-body').classList.remove('d-none');
}

function closeBigCard() {
    document.getElementById('bg-grey').classList.add('d-none1');
    //document.getElementById('card-container').classList.add('d-none')
}


function renderMiniSnipet(i, name, img, type) {
return /*html*/`
<div class="Pokemon-mini-card" id="Pokemon-mini-card${i}" onclick="selectPokemon(${i}, '${name}', '${img}', '${type}')">
    <div class="title-mini">
    
        <h2 class="pokeThumbTitle">${name}</h2>
        <div class="number-mini">#${i}</div>
    </div>
        <div class="pokeThumbContent">
            <span id="Pokemon-mini-card${i}" class="type-bg">${type}</span>
            <img class="pokemonPicMini" src="${img}">
        </div>
</div>`
}

function BigCardHtmlSnipet(i, name, img, type){
    return /*html*/`<img src="./img/arrow-left.svg" class="back-arrow" onclick="closeBigCard()">
    <div class="P-title-div">
        <h2 class="pokeThumbTitle">${name}</h2>
        <div class="number-mini">#${i}</div>
    </div>    
    
        <div class="pokeThumbContent">
        <span id="Pokemon-mini-card${i}" class="type-bg">${type}</span>
        <img class="pokemonPicBig" src="${img}">
    </div>`
}

function filterPokemons(event) {
    //search input and button from bootstrap is inside a form thus prevent default function
    event.preventDefault();
    //get search value from input
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    //empty all mini cards from main container div
    let searched = document.getElementById('allPokemons');
    searched.innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        let result = allPokemons[i];
    
        if(result['name'].toLowerCase().includes(search)) {
            //console.log(result['name'])
            let name = result['name'];
            name = name[0].toUpperCase() + name.slice(1);
            let img = result['sprites']['other']['home']['front_default'];
            let type = result['types'][0]['type']['name'];

            document.getElementById('allPokemons').innerHTML +=
            //html code in seperate function
            renderMiniSnipet(i, name, img, type);

            document.getElementById(`Pokemon-mini-card${i}`).style.backgroundColor = colors[type];
        }
    }
}

