/*
    Este script permite tomar el texto ingresado por un usuario en un elemento textarea
    y traducirlo a su equivalente en sistema binario.

    El metodo consiste de 3 pasos:
        1- Generación de una lista con los valores ASCII de los caracteres de la cadena.
        2- Obtención del equivalente binario para cada valor ASCII
        3- Concatenar todos los valores binarios formando la cadena traducida
*/

const boton = document.getElementById('btnTraducir')

//Funcion principal. Se ejecuta al hacer click en el boton 'Traducir'
boton.onclick = function traducir(){
    let listASCII = []
    let listNumbers = []
    let texto = document.getElementById('campoTexto').value
    let traduccion = document.getElementById('traduccion')
    let nuevoTexto = ''

    //Compruebo que haya texto en el elemento textarea
    if(texto != ''){

        //Recorro la cadena ingresada, obtengo los valores ASCII de cada caracter y los almaceno en una lista
        for(let i=0; i<texto.length; i++){
            let ascii = texto.charCodeAt(i)
            listASCII.push(ascii)
        }
        
        //Paso la lista con los valores ASCII de la cadena a la funcion textToBinary(). Asigno el valor de retorno a la letiable nievoTexto
        nuevoTexto = textToBinary(listASCII)
    
        //Muestro el texto traducido en el segundo campo de texto
        traduccion.innerText = nuevoTexto
    }
}

//Traduzco el texto. Recibe como argumento la lista que contiene los valores ASCII de cada caracter del texto ingresado
function textToBinary(lista){
    let textoTraducido = ''

    //Recorro la lista
    for(let i=0; i<lista.length; i++){
        //Paso el caracter a la funcion charToBinary() y almaceno el resultado en la letiable binaryWord
        let binaryWord = charToBinary(lista[i])

        //Agrego el caracter traducido a la cadena, agregando tambien un espacio en blanco al final de cada caracter
        textoTraducido += binaryWord + ' '
    }

    return(textoTraducido)
}

//Transformar un identificador ASCII a su equivalente binario
function charToBinary(asciiChar){
    let binary = ''
    
    //Creo la lista con los numeros del 128 al 1 para realizar la conversion
    let listNums = []

    for(let i=7; i>=0; i--){
        listNums.push(2**i)
    }

    //Realizo la conversion a binario
    for(let i=0; i<listNums.length; i++){
        if(asciiChar >= listNums[i]){ 
            binary += '1'
            asciiChar = asciiChar - listNums[i]
        }else{
            binary += '0'
        }
    }

    return(binary)
}

