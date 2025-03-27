//buscar datos del pokemon dependiendo del numero o el nombre// Buscar datos del Pokémon dependiendo del número o el nombre
function buscarPokemon(contenedorNumero) {
    let inputId = `pokemonInput${contenedorNumero}`;
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

    fetch(urlApi)
        .then(response => response.json())
        .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
        .catch(() => mostrarError(contenedorNumero));
}

// Mostrar los datos del Pokémon
function mostrarPokemon(datosPokemon, contenedorNumero) {
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);

    // Obtener habilidades del Pokémon
    let habilidades = datosPokemon.abilities
        .map(ability => ability.ability.name) // Extraer solo los nombres de las habilidades
        .join(', '); // Convertir el array en una cadena separada por comas

    infoDiv.innerHTML = `
        <h2 class="pk-name">${datosPokemon.name.toUpperCase()}</h2>
        <img class="pk-img" src="${datosPokemon.sprites.other["official-artwork"].front_default}">
        <p> <strong>Número: </strong> ${datosPokemon.id}</p>
        <p> <strong>Peso:</strong> ${datosPokemon.weight / 10} kg</p>
        <p> <strong>Altura:</strong> ${datosPokemon.height / 4} m</p>
        <p><strong> Habilidades:</strong> ${habilidades}</p> 
    `;
}

//Error en busqueda de pokemon 

function mostrarError(contenedorNumero){
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);
   infoDiv.innerHTML =  `<p class="pk-ms">POKEMON NO ENCONTRADO. <br> intenta con otro nombre o Numero</p>`
}

//Mostrar pokemon inicial 

window.onload = function( ){
    document.getElementById("pokemonInput1").value = "25";
    buscarPokemon(1);
    document.getElementById("pokemonInput2").value = "4";
    buscarPokemon(2);
}

function cargar(POKEMON) {
    document.getElementById("pokemonInput1").value = POKEMON;
    buscarPokemon(1);
    document.getElementById("pokemonInput2").value = POKEMON;
    buscarPokemon(2);
    
}


