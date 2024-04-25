let randomNumber = parseInt(Math.random()*100+1)
// Constantes para manipular os elementos html

const submit = document.querySelector('#jogar')
const jogada = document.querySelector('#txtNumero')
const jogadaAnterior = document.querySelector('.vezes')
const jogadasRestantes = document.querySelector('.numChances')
const recomecar = document.querySelector('.resultados')
const avisos = document.querySelector('.avisos')
// Criando um parágrafo usando o JavaScript

const p = document.createElement('p')
// Criando um vetor para receber números jogados

let numerosJogados = []
// Criando um contador para as jogadas

let minhasJogadas = 1
let playGame = true 
// Variável que permite o jogador jogar

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
        let tentativa = parseInt(jogada.value) // armazenando o conteúdo da caixa de texto
        validaChances(tentativa) // função que irá validar o conteúdo jogado
        
    })
}

function validaChances(tentativa){
    if(isNaN(tentativa)){
        alert('Atenção, para jogar informe um valor numérico entre 1 e 100')
        jogada.value = '' // limpando o conteúdo
        jogada.focus()
    }
    else if(tentativa < 0 || tentativa > 100){
        alert('Atenção para jogar informe um valor numérico entre 1 e 100')
        jogada.value = '' // Limpando o conteúdo da caixa de texto 
        jogada.focus() // setendo o foco na caixa de texto
    }

    else if(numerosJogados.includes(tentativa)){
        alert('Atenção!! O número informado já foi jogado.')
        jogada.value = ''
        jogada.focus()
    }
    else{
        numerosJogados.push(tentativa) //? empurrando um elemento para o vetor
        if(minhasJogadas === 6 && tentativa !== randomNumber){
            displayTentativas(tentativa) // função
            msg(`Game Over !! <br> O número correto era ${randomNumber}`) // função
            fimJogo() // função
        }
        else{
            displayTentativas(tentativa)
            checarTentativas(tentativa)
        }
    }
}

function checarTentativas (tentativa){
    if (tentativa == randomNumber){
    msg('Parabéns, você acertou o número!!')
    fimJogo()
    } 

    else if(tentativa < randomNumber){
        msg('Palpite baixo, tente novamente')
    }

    else if(tentativa > randomNumber){
        msg('Alto demais, tente novamente')
    }
}

/*
    vamos limpar a caixa para próxima jogada ^
                                             |


    vamos inserir uma informação dentro de um elemento HTML |
                                                            V
*/
function displayTentativas(tentativa){
    jogada.value = ''
    jogada.focus()
    jogadaAnterior.innerHTML += ` ${tentativa} `
    minhasJogadas++
    jogadasRestantes.innerHTML = ` ${7 - minhasJogadas} `
} 

function msg(texto){
    avisos.innerHTML = `<h1>${texto}</h1>`
}

function fimJogo(){
    jogada.value = ''
    jogada.setAttribute('disabled','')
    submit.setAttribute('disabled','')
    p.classList.add('button') // adicione um estilo para o botão
    p.innerHTML = '<h1 id="iniciarJogada">Iniciar o jogo</h1>'
    recomecar.appendChild(p)
    playGame = false
    iniciarJogo()
}

function iniciarJogo(){
    const botaoIniciar = document.querySelector('#iniciarJogada')
    botaoIniciar.addEventListener('click', function(){
        let randomNumber = parseInt(Math.random()*100+1)
        numerosJogados= []
        minhasJogadas = 1
        jogadaAnterior.innerHTML = ''
        avisos.innerHTML = ''
        jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
        jogada.removeAttribute('disabled','')
        submit.removeAttribute('disabled','')
        recomecar.removeChild(p)
        playGame = true
    })
}