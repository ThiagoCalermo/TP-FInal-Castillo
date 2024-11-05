var UrlActores="https://api.yumserver.com/16753/generic/actores";
window.addEventListener('load',()=>{
  var nombre =document.getElementById('nombre');
  var fechaNacimiento =document.getElementById('fechaNacimiento');
  ObtenerActores();

  form.addEventListener('submit',(x)=>{
      x.preventDefault();
  })    
})

function ObtenerActores() {
  document.getElementById('lista').setAttribute('style','display:flex');
  document.getElementById('contenedorForm').setAttribute('style','display:none');
    fetch(UrlActores)
      .then(response => response.json())
      .then(actores => {
        MostrarActores(actores);
        
      })
      .catch(error => console.error('Error:', error));
}
function MostrarActores(actores) {
    let html = '';
    for (let i = 0; i < actores.length; i++) {
      html += `
               <tr>
                <td>${actores[i].idcod}</td>
                <td>${actores[i].param1}</td>
                <td>${actores[i].param2}</td>
                <th><button onclick="borrarActor('${actores[i].idcod}')" style="background-color: #292929;color: #ea899e;">Borrar</button><button onclick="editarActor('${actores[i].idcod}')" style="background-color: #292929;color: #ea899e;">Editar</button></th>
         </tr>`;
    };
    document.getElementById('resultados').innerHTML = html;
}

let actorG = {
  id: 0,
  idLegajo: "16753",
  idcod: "",
  tabla: "actores",
  param1: document.getElementById('nombre').value,
  param2: document.getElementById('fechaNacimiento').value,
  param3: "",
  param4: "",
  param5: "",
  param6: "",
  param7: "",
  param8: "",
  param9: "",
  param10: ""
};

function editarActor(idcod) {
  
  fetch(`${UrlActores}/${idcod}`)
    .then(response => response.json())
    .then(actor => {
     
      document.getElementById('nombre').value = actor.param1;
      document.getElementById('fechaNacimiento').value = actor.param2;
      actorG.id = actor.id
      actorG.idcod = actor.idcod
      
      document.getElementById('lista').setAttribute('style', 'display:none');
      document.getElementById('contenedorForm').setAttribute('style','display:flex');
    })
    .catch(error => console.error('Error:', error));
}


function GuardarCambios() {
    actorG.param1 = document.getElementById('nombre').value,
    actorG.param2 = document.getElementById('fechaNacimiento').value
  if (validaCampos()) {
    try {
      fetch(UrlActores, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actorG),
      })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error.json()));
      alert("Actor modificado con exito");
      window.location.reload();
    } catch (error) {
      console.error('Error al intentar guardar los cambios:', error);
    }
  }
}

function CancelarCambios(){
  document.getElementById('lista').setAttribute('style','display:flex');
  document.getElementById('contenedorForm').setAttribute('style','display:none');
}


function borrarActor(idcod) {
  if (window.confirm(`¿Estás seguro de que deseas eliminar el producto con el idcod ${idcod}?`)) {
    fetch(UrlActores, {
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
    const nombreValor=nombre.value.trim();
    const fechaNacimientoValor=fechaNacimiento.value.trim();
    var bandera=true;
    
    
    if (!nombreValor){
        validaFalla(nombre,"CAMPO VACIO");
        bandera=false;
    }else{
        validaOk(nombre);
    }
    var formatoFecha =/^(0[1-9]|[12][0-9]|3[01]) (0[1-9]|1[0-2]) (\d{4})$/;
    var formatoAño = fechaNacimientoValor.substring(fechaNacimientoValor.length-4);
    
   
    if(!fechaNacimientoValor){
        validaFalla(fechaNacimiento,"CAMPO VACIO")
    
        bandera=false;
    }if((!formatoFecha.test(fechaNacimientoValor)) || (!/^(\d{4})$/.test(formatoAño))){
        validaFalla(fechaNacimiento,"INGRESE FORMATO DD MM YYYY")
        
        bandera=false;
    }else{
        validaOk(fechaNacimiento);
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
