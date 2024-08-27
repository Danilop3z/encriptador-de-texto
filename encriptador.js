const d = document;
const textArea = d.querySelector(".contenido__imput__texto");
const imagenPsj = d.querySelector(".imagen__muñeco");
const loader = d.querySelector(".loader");
const resultado = d.querySelector(".respuesta__titulo");
const tResultado = d.querySelector(".respuesta__texto");
const btnEncriptar = d.querySelector(".boton");
const btnDesencriptar = d.querySelector(".boton--secundary");
const btnCopiar = d.querySelector(".resultado__btn")


const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

//Funcion para encriptar
function encriptarMensaje(mensaje) {
        let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++) {
            if(letra === llaves[j][0]) {
                encriptada = llaves[j][1]; //reeemplaza la letra por su equivalente encriptado
            break; //Termina el bucle cuando se encuentra la correspondencia    
    }
        }
        mensajeEncriptado += encriptada;
    }    

    return mensajeEncriptado;
}

//funcion para desencriptar
function desencriptarMensaje(mensaje) {
        let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}
//Ocultar elementos dinamicamente
textArea.addEventListener("input", (e)=>{
    imagenPsj.style.display = "none"; 
    loader.classList.remove("hidden");
    resultado.textContent = "Capturando Mensaje...";
    tResultado.textContent = "";
});
//Funcion del boton encriptar
btnEncriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    tResultado.textContent = mensajeEncriptado;
    btnCopiar.classList.remove("hidden");
    resultado.textContent = "El resultado es: ";
});

btnDesencriptar.addEventListener("click", (e)=> {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultado.textContent = "El resultado es: ";
    tResultado.textContent = mensajeDesencriptado;
    btnCopiar.classList.remove("hidden");
});


btnCopiar.addEventListener("click", ()=> {
    let textoCopiado = tResultado.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        imagenPsj.style.display = "block";
        loader.classList.add("hidden");
        resultado.textContent = "El texto fue copiado";
        btnCopiar.classList.add("hidden");
        tResultado.textContent = "";
    });
});