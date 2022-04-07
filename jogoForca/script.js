/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

/* categorias das palavras */
const categorias = {
    frutas: ['banana','uva'],
    onePiece:['Luffy','Zoro'],
    cores:['azul','amarelo']
}

/* retorna o array das categorias */
function retornaArrayCategorias(){
    return Object.keys(categorias) //retorna propriedades do objeto categorias para um array
}

/* acessa um indice aleatorio da categoria */
function retornaCategoria(){
    listaCategorias = retornaArrayCategorias()
    let aleatorio = numeroAleatorio(listaCategorias.length) // gera o aleatorio
    return listaCategorias[aleatorio]
}

function exibeCategoria(){
    categoria.innerHTML= retornaCategoria()
    
}

function numeroAleatorio(tamanhoDoArray){
    return Math.floor(Math.random() * tamanhoDoArray)
}

function definePalavraProposta(){
    const arrayPalavras = categorias[categoria.innerHTML];  //aqui acessa as propriedades da categoria ja sorteada
    let indicePalavra = numeroAleatorio(arrayPalavras.length)
    palavraProposta = arrayPalavras[indicePalavra]
    console.log(palavraProposta)
    ocultaPalavraProposta();

}

function ocultaPalavraProposta(){
    let palavraOculta =''
    for(let i =0; i< palavraProposta.length; i++){
        palavraOculta += '-'
    }
    exibePalavraInterface(palavraOculta)
}

function exibePalavraInterface(palavra){                //conexão js com html
    palavraInterface.innerHTML = palavra    //palavra interface é o nome da função ja predefinida

}

function tentativa(letra){
    
    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra)
    }
    else if (letrasErradasArray.includes(letra)){
            letrasErradas.innerHTML="repetida"
    }else{
        letrasErradasArray.push(letra)
        letrasErradas.innerHTML = "letras erradas: " + letrasErradasArray
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }

    }
    verificaFimdeJogo()
}

function atualizaPalavraInterface(letra){
    let palavraAux = '';
    for (i=0; i<palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra
        }else if(palavraInterface.innerHTML[i]){ //se a letra ja esta sendo exibida na interface
            palavraAux += palavraInterface.innerHTML[i]
        }
        else{
            palavraAux += '-'
        }

    }
    exibePalavraInterface(palavraAux)

}

function verificaFimdeJogo(){
    if (!palavraInterface.innerHTML.includes('-')){  //o ! significa que não contem tracinhos
        exibePalavraInterface("ACERTO MISERAVI")
        window.removeEventListener("keypress", retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas ){
        desenhaOlhos();
        exibePalavraInterface("PERDEU !")
        window.removeEventListener("keypress", retornaLetra)

    }

}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
