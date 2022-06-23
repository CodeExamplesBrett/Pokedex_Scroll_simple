function filterPokemons() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    //console.log(search);

    let searched = document.getElementById('allPokemons')
    searched.innerHTML = ''

    for (let i = 0; i < allPokemons.length; i++) {
        let result = allPokemons[i];
        //console.log('the seached one', result)

        if(result['name'].toLowerCase().includes(search)) {
            //console.log(result['name'])
            let name = await allPokemons['name']
            name = await name[0].toUpperCase() + name.slice(1);
            let img = await allPokemons['sprites']['other']['home']['front_default'];
            let type = await allPokemons['types'][0]['type']['name'];

            document.getElementById('allPokemons').innerHTML +=
            //html code in seperate function
            renderMiniSnipet(i, name, img, type)
        
        }
        
    }
}