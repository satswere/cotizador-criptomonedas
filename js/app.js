import { ConsultarApi } from "./api.js";

const SelectMoneda = document.querySelector("#moneda");
const SelectCriptomoneda = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");


const ObjSearch = {
  moneda: `${SelectMoneda.value}`,
  criptomoneda: `${SelectCriptomoneda.value}`,
};

document.addEventListener("DOMContentLoaded", () => {
  ObtenerCriptomonedas();
  SelectMoneda.addEventListener("change", ObtenerValorSelect);
  SelectCriptomoneda.addEventListener("change", ObtenerValorSelect);
  formulario.addEventListener("submit", ObtenerInformacionApi);
});

function ObtenerCriptomonedas() {
  const link ="https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
  ConsultarApi(link).then((datos) => MostrarCriptomonedas(datos.Data));
}

const MostrarCriptomonedas = (criptomonedas) => {
  SelectCriptomoneda.innerHTML = `<option value="">Elige tu criptomoneda</option>`;
  criptomonedas.forEach((criptomoneda) => {
    const { FullName, Name } = criptomoneda.CoinInfo;
    SelectCriptomoneda.innerHTML += `<option value="${Name}">${FullName}</option>`;
  });
};


const ObtenerInformacionApi = (e) => {
  e.preventDefault();
  const { moneda, criptomoneda } = ObjSearch;
  const link = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  MostrarSpiner();
  ConsultarApi(link).then((datos) => {
    MostrarInformacionApi(datos.DISPLAY[criptomoneda][moneda]);
  });
};

const MostrarInformacionApi = (datos) => {
  const { PRICE, LASTUPDATE, CHANGE24HOUR, HIGHDAY, LASTTRADEID } = datos;
LimpiarHtml();
  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML =` 
    Precio : <span> ${PRICE}</span> <br>
    Mas Alto Hoy: <br> <span>${HIGHDAY} </span> <br>
    Ultima Transacción : <br> <span>${LASTTRADEID} </span> <br>
    variacion en las ultimas 24 H: <br><span>${CHANGE24HOUR} </span> <br>
    `;
  resultado.appendChild(precio);
};

const ObtenerValorSelect = (e) => (ObjSearch[e.target.name] = e.target.value);

const MostrarSpiner = () =>{
  LimpiarHtml();
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML +=`
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
  `;

  resultado.appendChild(spinner);

}
const LimpiarHtml = () =>{
  resultado.innerHTML = "";
}