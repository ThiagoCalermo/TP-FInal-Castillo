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
  document.getElementById('EditarActor').setAttribute('style','display:none');
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
                <th><button onclick="brorrarActor('${actores[i].idcod}')">Borrar</button><button onclick="editarActor('${actores[i].idcod}')">Editar</button></th>
         </tr>`;
    };
    document.getElementById('resultados').innerHTML = html;
}

function editarActor(idcod) {
  
  fetch(`${UrlActores}/${idcod}`)
    .then(response => response.json())
    .then(actor => {
     
      document.getElementById('nombre').value = actor.param1;
      document.getElementById('fechaNacimiento').value = actor.param2;
      
      document.getElementById('lista').setAttribute('style', 'display:none');
      document.getElementById('EditarActor').setAttribute('style','display:flex');
    })
    .catch(error => console.error('Error:', error));
}


async function GuardarCambios() {
  const actor = {
    param1: document.getElementById('nombre').value,
    param2: document.getElementById('fechaNacimiento').value,
  };

  console.log(actor);

  if (validaCampos()) {
    try {
      const response = await fetch(`${UrlActores}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actor)
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      console.log(data);
      alert('Se modificó el actor correctamente.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al modificar el actor.'); 
    }
  }
}


function brorrarActor(idcod) {
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
