//YA ANDA NO MIRAR MÁS

window.addEventListener('load',()=>{
    var nombre =document.getElementById('nombre');
    var fechaNacimiento =document.getElementById('fechaNacimiento');

    form.addEventListener('submit',(x)=>{
        x.preventDefault();
    })    
})

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

alert(formatoFecha);
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

var UrlActores="https://api.yumserver.com/16753/generic/actores";

async function nuevoActor(){
if(validaCampos()){
    const nombreValor=nombre.value.trim();
    const fechaNacimientoValor=fechaNacimiento.value.trim();
    let actor={
        param1: nombreValor,
        param2: fechaNacimientoValor,
      };
      
      fetch(UrlActores,{
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(actor)
      })
      .then(response=>response.text())
      .then(
          function(texto){
              if(texto.trim()=="OK"){
                  alert('Se cargo al actor con exito.');
              }else{
                  alert(texto);
              }
          }
      )
      .catch(error =>console.error('Error:', error)); 
}
}


