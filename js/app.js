const select_moneda = document.querySelector("#moneda");
const SelectCriptomoneda = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");

const ObjSearch = {
  moneda: "",
  criptomoneda: "",
};

const SelectCripto = (criptos) => {
  SelectCriptomoneda.innerHTML = `<option value="">Elige tu criptomoneda</option>`;
  criptos.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    SelectCriptomoneda.innerHTML += `<option value="${Name}">${FullName}</option>`;
  });
};

const consultar_criptomonedas = async () => {
  const url =
    "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  SelectCripto(resultado.Data);
};

const obtenerValor = (e) => (ObjSearch[e.target.name] = e.target.value);

const imprimir_resultado = (datos) => {
    const {PRICE,LASTUPDATE,CHANGE24HOUR,HIGHDAY,LASTTRADEID} = datos;
    const resultado = document.querySelector('#resultado')
    resultado.innerHTML = "";
    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = 
    `Precio : 
    <span>    ${PRICE}
    </span> <br>
    Mas Alto Hoy: <br> <span>${HIGHDAY} </span> <br>
    Ultima Transacción : <br> <span>${LASTTRADEID} </span> <br>
    variacion en las ultimas 24 H: <br><span>${CHANGE24HOUR} </span> <br>
    `
    
    ;

    resultado.appendChild(precio);
}

const consultar_api = async (e) =>{
    e.preventDefault();
  const {moneda, criptomoneda} = ObjSearch;
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

const respuesta = await fetch (url);
const resultado = await respuesta.json();
//console.log(resultado.DISPLAY[criptomoneda][moneda])

imprimir_resultado(resultado.DISPLAY[criptomoneda][moneda])
}

document.addEventListener("DOMContentLoaded", () => {
  consultar_criptomonedas();
  select_moneda.addEventListener("change", obtenerValor);
  SelectCriptomoneda.addEventListener("change", obtenerValor);
  formulario.addEventListener("submit", consultar_api);
});
