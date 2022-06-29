let pagina = 1;
const btnAnterior =  document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000)
    {
        pagina +=1;
        cargaPeliculas();
    }
});
btnAnterior.addEventListener('click', () => {
    if(pagina > 1)
    {
        pagina -=1;
        cargaPeliculas();
    }
});

const cargaPeliculas = async() => {
    try{
        const respuesta =  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d1ac8a54f414d93a73e0924eb5c3f844&lenguage=es-MX&page=${pagina}`);
        
        let peliculas = '';
        //Si la respuesta es correcta
        if(respuesta.status === 200){
            const datos =  await respuesta.json();
            
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });
            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status === 401)
        {
            console.log("Llave Erronea");
        }else if(respuesta.status == 400)
        {
            console.log("No existe");
        }else{
            console.log("Error desconocido");
        }

    }catch(error){
        console.log(error);
    }

}

cargaPeliculas();