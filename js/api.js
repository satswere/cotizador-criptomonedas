export async function ConsultarApi(url){
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    return resultado;
    }
    