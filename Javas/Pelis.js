window.addEventListener('load',()=>{
  ObtenerPeliculas();
})
var UrlPeliculas="https://api.yumserver.com/16753/generic/peliculas";

function ObtenerPeliculas() {
  document.getElementById('lista').setAttribute('style','display:flex');
  document.getElementById('EditarPelicula').setAttribute('style','display:none');
  fetch(UrlPeliculas)
    .then(response => response.json())
    .then(peliculas => {
      MostrarPeliculas(peliculas);
      
    })
    .catch(error => console.error('Error:', error));
}
function MostrarPeliculas(pelicula) {
  let html = '';
  for (let i = 0; i < pelicula.length; i++) {
    html +=  `
    <tr>
     <td>${pelicula[i].idcod}</td>
     <td>${pelicula[i].param1}</td>
     <td>${pelicula[i].param2}</td>
     <td>${pelicula[i].param3}</td>
     <td>${pelicula[i].param4}</td>
     <th><button onclick="brorrarActor('${pelicula[i].idcod}')">Borrar</button><button onclick="editarPelicula('${pelicula[i].idcod}')">Editar</button></th>
</tr>
<br>`;
  };
  document.getElementById('resultados').innerHTML = html;
}
function editarPelicula(idcod) {
  
  fetch(`${UrlPeliculas}/${idcod}`)
    .then(response => response.json())
    .then(pelicula => {
     
      document.getElementById('titulo').value = pelicula.param1;
      document.getElementById('genero').value = pelicula.param2;
      document.getElementById('fechaEstreno').value = pelicula.param3;
      document.getElementById('resumen').value = pelicula.param4;

      document.getElementById('lista').setAttribute('style', 'display:none');
      document.getElementById('EditarPelicula').setAttribute('style','display:flex');
    })
    .catch(error => console.error('Error:', error));
}

function GuardarCambios() {
  const pelicula = {
    param1: document.getElementById('titulo').value,
    param2: document.getElementById('genero').value,
    param3:document.getElementById('fechaEstreno').value,
    param4:document.getElementById('resumen').value,
  };
  console.log(pelicula);
  if(validaCampos()){
    fetch(`${UrlPeliculas}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pelicula)
    })
    .then(response => response.json())
    .then(pelicula => console.log(pelicula))  
    .catch(error => console.error('Error:',error));
    alert('se modificó la pelicula ');
  }
  
}
