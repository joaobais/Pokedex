let pokeLista = [];
let pokeNome = document.querySelector(".poke_nome");
const pokeNumero = document.querySelector(".poke_numero");
const pokeTipoUm = document.querySelector(".poke_tipo_um");
const pokeTipoDois = document.querySelector(".poke_tipo_dois");
const pokeImagem = document.querySelector(".poke_imagem");
const campoPokedex = document.getElementById("campo_pokedex");

const fetchPokemon = async (pokemon) => {
  const respostaAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const data = await respostaAPI.json();
  return data;
};

async function renderizar(pokemon) {
  let elementoLocal = [];
  let elemento = "";
  const dataPokemon = await fetchPokemon(pokemon);
  let tipos = dataPokemon.types;
  //console.log(dataPokemon)
  //pokeNome.innerHTML elemento += dataPokemon.name;
  elemento += '<div class="carta">';
  elemento += '<div class="imagem_cima">';
  elemento += `<span class="poke_numero"> ${dataPokemon.id} </span>#`;
  elemento += `<span class='poke_nome'> ${dataPokemon.name} </span>`;

  elemento += `</div>`;
  elemento += `<div class='poke_imagem_pokedex'>`;
  elemento += `<img class='poke_imagem' src= ${dataPokemon["sprites"]["other"]["official-artwork"]["front_default"]} alt='Pokemon'/>`;
  //pokeImagem.src = dataPokemon['sprites']['other']['official-artwork']['front_default']
  elemento += `</div>`;
  elemento += `<div class='imagem_baixo'>`;
  for (tipo in tipos) {
    elementoLocal.push(
      `<span class='poke_tipo'> ${tipos[tipo].type.name} </span>`
    );
  }
  if (elementoLocal.length > 0) {
    elemento += elementoLocal.join(`-`);
  }
  elemento += `</div>`;
  elemento += `</div>`;
  //pokeTipoUm.innerHTML = dataPokemon['types']['0']['type']['name']
  //pokeTipoDois.innerHTML = " - " + dataPokemon['types']['1']['type']['name']

  campoPokedex.innerHTML += elemento;
}

async function pegaPokemon() {
  for (var i = 1; i < 152; i++) {
    let pokemon = await fetchPokemon(i);
    pokeLista.push(pokemon);
    renderizar(i);
  }
}

pegaPokemon();

async function procura() {
  var textoProcura = document.getElementById("caixaProcurar").value;
  console.log(textoProcura)
  renderizar(textoProcura)
}
