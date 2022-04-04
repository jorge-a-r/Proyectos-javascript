let canvas, ctx;
let fps = 30;
let canvasX = 500, canvasY = 500;
let tileX, tileY;

// Variables del tablero de juego
let tablero;
let filas = 100, columnas = 100;

// Colores
let blanco = '#FFFFFF';
let negro = '#000000';

function crearMatriz(f,c){
    let obj = new Array(f);

    for(i=0; i<f; i++){
        obj[i] = new Array(c);
    }

    return obj;
}

//AGENTE
let Agente = function(x,y,estado){
    this.x = x;
    this.y = y;
    this.estado = estado;
    this.estadoProx = this.estado;
    this.vecinos = [];

    //método agregar vecinos
    this.addVecinos = function(){
        let xVecino, yVecino;

        //Recorremos la matriz 3x3 del agente central y sus 8 vecinos
        for(i=-1; i<2; i++){
            for(j=-1; j<2; j++){
                xVecino = (this.x + j + columnas) % columnas;
                yVecino = (this.y + i + filas) % filas;

                //Descartamos el agente actual y agregamos los demás al array de vecinos
                if(i != 0 || j != 0){
                    this.vecinos.push(tablero[yVecino][xVecino]);
                }
            }
        }

    }

    //metodo para dibujar
    this.dibuja = function(){
        let color;

        if(this.estado == 1){
            color = blanco;
        }
        else{
            color = negro;
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x*tileX, this.y*tileY, tileX, tileY);
    }

    //metodo para cambiar de estado / leyes de Comway
    this.nuevoCiclo = function(){
        let suma = 0;

        //calculamos los vecinos vivos
        for(i=0; i<this.vecinos.length; i++){
            suma += this.vecinos[i].estado;
        }

        //aplicamos las normas
        // <2 vecinos: Muere
        // >3 vecinos: Muere
        // 3 vecinos: Revive

        this.estadoProx = this.estado;

        //MUERTE
        if(suma<2 || suma>3){
            this.estadoProx = 0;
        }

        //VIDA
        if(suma == 3){
            this.estadoProx = 1;
        }
    }

    //metodo mutacion
    this.mutacion = function(){
        this.estado = this.estadoProx;
    }
}

//Funcion inicializa tablero
function inicializaTablero(obj){
    let estado;

    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            estado = Math.floor(Math.random()*2);

            obj[y][x] = new Agente(x,y,estado);
        }
    }

    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            obj[y][x].addVecinos()
        }
    }
}


//Creamos el tablero
tablero = crearMatriz(filas,columnas);

//Lo inicializamos
inicializaTablero(tablero);


function borraCanvas(){
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}

function dibujaTablero(obj){
    //dibuja los agentes
    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            obj[y][x].dibuja();
        }
    }

    //calcula el siguiente ciclo
    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            obj[y][x].nuevoCiclo();
        }
    }

    //aplica la mutacion
    for(y=0; y<filas; y++){
        for(x=0; x<columnas; x++){
            obj[y][x].mutacion();
        }
    }
}

function principal(){
    borraCanvas();
    dibujaTablero(tablero);
}

function inicializar(){
    //Asociamos el canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvasX;
    canvas.height = canvasY;

    //Calculo el tamaño de los tiles
    tileX = Math.floor(canvasX / filas);
    tileY = Math.floor(canvasY/ columnas);

    //Ejecucion de la función principal
    setInterval(function(){principal()}, 1000/fps);
}