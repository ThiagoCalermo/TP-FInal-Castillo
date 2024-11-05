window.addEventListener('load',()=>{
  ObtenerPeliculas();
  var titulo=document.getElementById('titulo').value;
  var genero=document.getElementById('genero').value;
  var fechaEstreno=document.getElementById('fechaEstreno').value;
  var resumen=document.getElementById('resumen').value;

  form.addEventListener('submit',(x)=>{
    x.preventDefault();
})  
})
var UrlPeliculas="https://api.yumserver.com/16753/generic/peliculas";

function ObtenerPeliculas() {
  document.getElementById('lista').setAttribute('style','display:flex');
  document.getElementById('contenedorForm').setAttribute('style','display:none');
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
     <th><button onclick="borrarPelicula('${pelicula[i].idcod}')" style="background-color: #292929;color: #ea899e;">Borrar</button><button onclick="editarPelicula('${pelicula[i].idcod}')" style="background-color: #292929;color: #ea899e;">Editar</button></th>
</tr>
<br>`;
  };
  document.getElementById('resultados').innerHTML = html;
}

let peliculaG = {
  id: 0,
  idLegajo: "16753",
  idcod: "",
  tabla: "peliculas",
  param1: document.getElementById('titulo').value,
  param2: document.getElementById('genero').value,
  param3: document.getElementById('fechaEstreno').value,
  param4: document.getElementById('resumen').value,
  param5: "",
  param6: "",
  param7: "",
  param8: "",
  param9: "",
  param10: ""
};

function editarPelicula(idcod) {
  
  fetch(`${UrlPeliculas}/${idcod}`)
    .then(response => response.json())
    .then(pelicula => {
     
      document.getElementById('titulo').value = pelicula.param1;
      document.getElementById('genero').value = pelicula.param2;
      document.getElementById('fechaEstreno').value = pelicula.param3;
      document.getElementById('resumen').value = pelicula.param4;
      peliculaG.id=pelicula.id;
      peliculaG.idcod=pelicula.idcod;

      document.getElementById('lista').setAttribute('style', 'display:none');
      document.getElementById('contenedorForm').setAttribute('style','display:flex');
    })
    .catch(error => console.error('Error:', error));
}



function GuardarCambios() {
  peliculaG.param1 = document.getElementById('titulo').value,
  peliculaG.param2 = document.getElementById('genero').value,
  peliculaG.param3 = document.getElementById('fechaEstreno').value,
  peliculaG.param4 = document.getElementById('resumen').value
  
if (validaCampos()) {
  try {
    fetch(UrlPeliculas, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(peliculaG),
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error.json()));
    alert("Pelicula modificada con exito");
    window.location.reload();
  } catch (error) {
    console.error('Error al intentar guardar los cambios:', error);
  }
}else{
  alert("Campos no validos");
}
}
function CancelarCambios(){
  document.getElementById('lista').setAttribute('style','display:flex');
  document.getElementById('contenedorForm').setAttribute('style','display:none');
}
function borrarPelicula(idcod){
  if (window.confirm(`¿Estás seguro de que deseas eliminar la pelicula con el idcod ${idcod}?`)) {
    fetch(UrlPeliculas, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idcod })
    })
      .then(response => response.text())
      .then(result => {
        if (result.trim() == 'OK') {
          alert('Actor eliminado correctamente.');
         
        } else {
          throw new Error(result);
        }
      })
      .catch(error => {
        console.error(error);

        alert('Error al eliminar el actor');
      
      });
  }
}

function validaCampos(){
  //Capturar los valores ingresados por el campo;
  const tituloValor=titulo.value.trim();
  const generovalor=genero.value.trim();
  const fechaEstrenoValor=fechaEstreno.value.trim();
  const resumenValor=resumen.value.trim();

  var bandera=true;
  
  
  if (!tituloValor){
      validaFalla(titulo,"CAMPO VACIO");
      bandera=false;
  }else{
      validaOk(titulo);
  }
  if (!generovalor){
    validaFalla(genero,"CAMPO VACIO");
    bandera=false;
  }else{
    validaOk(genero);
  }
  var formatoFecha =/^(0[1-9]|[12][0-9]|3[01]) (0[1-9]|1[0-2]) (\d{4})$/;
  var formatoAño = fechaEstrenoValor.substring(fechaEstrenoValor.length-4);

  if(!fechaEstrenoValor){
      validaFalla(fechaEstreno,"CAMPO VACIO")
  
      bandera=false;
  }if((!formatoFecha.test(fechaEstrenoValor)) || (!/^(\d{4})$/.test(formatoAño))){
      validaFalla(fechaEstreno,"INGRESE FORMATO DD MM YYYY")
      
      bandera=false;
  }else{
      validaOk(fechaEstreno);
  }
  if (!resumenValor){
    validaFalla(resumen,"CAMPO VACIO");
    bandera=false;
  }else{
    validaOk(resumen);
  }
  
  return bandera;
}

function validaFalla(input,msj){
  const formControl=input.parentElement;
  const aviso=formControl.querySelector('p');
  aviso.innerText=msj;
  
  formControl.className='form-control falla';
}
function validaOk(input){
  const formControl=input.parentElement;
  const aviso=formControl.querySelector('p')
  formControl.className='form-control ok';
  aviso.innerText=" ";
}
