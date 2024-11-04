var UrlActores="https://api.yumserver.com/16753/generic/actores";
window.addEventListener('load',()=>{

  ObtenerActores();

  var titulo =document.getElementById('titulo');
  var genero =document.getElementById('genero');
  var fechaEstreno =document.getElementById('fechaEstreno');
  var resumen =document.getElementById('resumen');
  

  form.addEventListener('submit',(x)=>{
      x.preventDefault();
  })    
})

//function CrearListaActores(actores){
//  var listaActores="";
//  for(let i = 0; i < actores.length; i++){
//    var actor =document.getElementById('idActor'+i)
//    if (actor.checked && actor) {
//      listaActores +="-"+actor.value;   
//    } 
//  }
//  return listaActores;
//}
//async function obtenerListaActores() {
//try {
//    const response = await fetch(UrlActores);
//    const actores = await response.json();
//    const actoresLista = CrearListaActores(actores);
//    return actoresLista; 
//  } catch (error) {
//    console.error('Error al obtener la lista de actores:', error);
//    return null; 
//  }
//} 

function ObtenerActores() {
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
                <td><input type="checkbox" value="${actores[i].idcod}" id="idActor${i}"></td>
         </tr>`
        ;
    };
    document.getElementById('resultados').innerHTML = html;
  }

var UrlPeliculas="https://api.yumserver.com/16753/generic/peliculas";

function validaCampos(){
  //Capturar los valores ingresados por el campo;
  const tituloValor=titulo.value.trim();
  const generoValor=genero.value.trim();
  const fechaEstrenoValor=fechaEstreno.value.trim();
  const resumenValor=resumen.value.trim();

  var bandera=true;
  
  
  if (!tituloValor){
      validaFalla(titulo,"CAMPO VACIO");
      bandera=false;
  }else{
      validaOk(titulo);
  }
  if (!generoValor){
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



async function nuevaPelicula(){
    if(validaCampos()){
      const tituloValor=titulo.value.trim();
      const generoValor=genero.value.trim();
      const fechaEstrenoValor=fechaEstreno.value.trim();
      const resumenValor=resumen.value.trim();
      let pelicula={
          param1: tituloValor,
          param2: generoValor,
          param3: fechaEstrenoValor,
          param4: resumenValor,
         };
         
      fetch(UrlPeliculas,{
             method: 'POST',
             headers:{'Content-Type':'application/json'},
             body: JSON.stringify(pelicula)
      })
      .then(response=>response.text())
      .then(
             function(texto){
                 if(texto.trim()=="OK"){
                     alert('Se cargo la pelicula con exito.');
                 }else{
                     alert(texto);
                 }
            }  
      )
      .catch(error =>console.error('Error:', error)); 
    }
}



