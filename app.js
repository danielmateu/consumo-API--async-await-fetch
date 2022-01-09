//API KEY - 2f70584ad90336f9f7957b6728ba9e95

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click',() => {
    if(pagina < 1000){
         pagina += 1;
    cargarPeliculas();
    }
   
});

btnAnterior.addEventListener('click',() => {
    if(pagina > 1){
         pagina -= 1;
    cargarPeliculas();
    }
   
});

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2f70584ad90336f9f7957b6728ba9e95&language=es-ES&page=${pagina}`);

        console.log(respuesta);

        //Comprobamos si la resuesta es correcta
        if(respuesta.status === 200){
        //Accedemos a la INFO
        const datos = await respuesta.json();
        //console.log(datos.title);
        //console.log(datos.results);
        let peliculas = '';
        datos.results.forEach(pelicula =>{
            peliculas += `
            <div class='pelicula'>
                <img class="poster" src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'
            </div>
            <h3 class='titulo'>${pelicula.title}</h3>
            `;
            //console.log(pelicula.title);
        });

        document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status === 401){
            console.log('Parece que la llave es incorrecta');

        }else if(respuesta.status === 404){
            console.log('La pelicula que buscas no existe');
        }else console.log('Algo raro ha pasado! xD');

    }catch(error){
        console.log(error);
    }




}

cargarPeliculas();