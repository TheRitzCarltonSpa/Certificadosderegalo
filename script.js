let carrito=[]
let total=0
let sugerenciaMostrada=false

function seleccionarValor(valor){
document.getElementById("valorCertificado").value=valor
}

function agregarCertificado(){
let valor=document.getElementById("valorCertificado").value
if(valor==""){alert("Ingrese un monto");return}

// ✅ Sanitizar comas
valor = valor.toString().replace(/,/g,'')

agregar("Certificado $" + valor,parseFloat(valor))
document.getElementById("valorCertificado").value=""
}

const servicios={

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en las tradiciones Aztecas e influenciado por el poder y el simbolismo de la luna llena (Metztli). Ritual profundamente curativo y meditativo."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Tratamiento facial completo con tecnología pre y probiótica inspirado en Kobido japonés."}
],

masajes:[
{nombre:"Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Experiencia de masaje en pareja"},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Masaje de presión suave"},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Presión profunda"},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Presión moderada"},
{nombre:"Masaje recuperacion muscular",precio60:2800,precio90:3700,desc:"Alivia tensión muscular"},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Incluye piedras calientes"},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Relajación profunda"},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Para embarazadas"}
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Adaptado a la piel"},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Reduce signos de edad"},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Resultados inmediatos"},
{nombre:"Hydrafacial",precio60:4500,desc:"No invasivo"},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Limpieza profunda"},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Tratamiento rápido"}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Renovación de piel"},
{nombre:"Tratamiento corporal equilibrante 60 min",precio:2600,desc:"Relajación total"},
{nombre:"Tratamiento corporal nutritivo 60 min",precio:2600,desc:"Hidratación profunda"},
{nombre:"Power hour 60 min",precio:2400,desc:"Estimulación corporal"}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300,desc:"Renovación celular"},
{nombre:"Piedras calientes",precio:300,desc:"Relaja músculos"},
{nombre:"Mascarilla plástica",precio:400,desc:"Nutrición de piel"},
{nombre:"Aromaterapia",precio:300,desc:"Aceites esenciales"}
]

}

// ✅ Validación de categoría
function mostrar(cat){

if(!servicios[cat]) return

let html=""

servicios[cat].forEach(s=>{

if(s.precio60 && s.precio90){

html+=`

<div class="card">  
<h3>${s.nombre}</h3>  
<button class="agregar" onclick="agregar('${s.nombre} 60 min',${s.precio60})">60 min $${s.precio60}</button>  
<button class="agregar" onclick="agregar('${s.nombre} 90 min',${s.precio90})">90 min $${s.precio90}</button>  
<button class="detalle" onclick="detalle(\`${s.nombre}\`,\`${s.desc}\`)">Detalle</button>  
</div> 

`
}else if(s.precio25 && s.precio40){

html+=`

<div class="card">  
<h3>${s.nombre}</h3>  
<button class="agregar" onclick="agregar('${s.nombre} 25 min',${s.precio25})">25 min $${s.precio25}</button>  
<button class="agregar" onclick="agregar('${s.nombre} 40 min',${s.precio40})">40 min $${s.precio40}</button>  
<button class="detalle" onclick="detalle(\`${s.nombre}\`,\`${s.desc}\`)">Detalle</button>  
</div> 

` 
}else if(s.precio60 && !s.precio90){

html+=`

<div class="card">  
<h3>${s.nombre}</h3>  
<button class="agregar" onclick="agregar('${s.nombre} 60 min',${s.precio60})">60 min $${s.precio60}</button>  
<button class="detalle" onclick="detalle(\`${s.nombre}\`,\`${s.desc}\`)">Detalle</button>  
</div> 

` 
}else{

html+=`
<div class="card">  
<h3>${s.nombre}</h3>  
<button class="agregar" onclick="agregar('${s.nombre}',${s.precio})">$${s.precio}</button>  
<button class="detalle" onclick="detalle(\`${s.nombre}\`,\`${s.desc}\`)">Detalle</button>  
</div>  
`
}

})

document.getElementById("servicios").innerHTML=html
}

/* RECOMENDACION */

function recomendarMejoras(nombre){

if(sugerenciaMostrada) return

let texto=nombre.toLowerCase()

if(texto.includes("facial") || texto.includes("hydrafacial")){

document.getElementById("tituloMejoras").innerText="Potencia tu facial"

document.getElementById("opcionesMejoras").innerHTML=  <button class="boton-dorado" onclick="agregar('Mascarilla 111skin',500); cerrarMejoras()">Mascarilla 111skin $500</button>   <button class="boton-dorado" onclick="agregar('Rodillo de jade',300); cerrarMejoras()">Rodillo de jade $300</button>  

}else{

document.getElementById("tituloMejoras").innerText="Mejora tu masaje"

document.getElementById("opcionesMejoras").innerHTML=  <button class="boton-dorado" onclick="agregar('Aromaterapia',300); cerrarMejoras()">Aromaterapia $300</button>   <button class="boton-dorado" onclick="agregar('Piedras calientes',300); cerrarMejoras()">Piedras calientes $300</button>  
}

document.getElementById("modalMejoras").style.display="flex"
sugerenciaMostrada=true
}

function cerrarMejoras(){
document.getElementById("modalMejoras").style.display="none"
sugerenciaMostrada=false
}

function agregar(nombre,precio){
if(typeof precio !== "number" || isNaN(precio)) return

carrito.push({nombre,precio})
actualizar()
recomendarMejoras(nombre)
}

function eliminar(i){
carrito.splice(i,1)
actualizar()
}

function actualizar(){

let lista=document.getElementById("lista")
let html=""
total=0

carrito.forEach((item,i)=>{
total+=item.precio

html+=`

<div class="item-carrito">  
${item.nombre} $${item.precio}  
<button class="eliminar" onclick="eliminar(${i})">X</button>  
</div>  
`  
}) 

lista.innerHTML=html
document.getElementById("total").innerText=total
}

/* PROPINA */
function togglePropina(mostrar){
document.getElementById("montoPropina").style.display=mostrar?"block":"none"
}

function detalle(t,d){
document.getElementById("titulo").innerText=t
document.getElementById("descripcion").innerText=d
document.getElementById("modal").style.display="flex"
}

function cerrar(){
document.getElementById("modal").style.display="none"
}

// ✅ Precio definido correctamente
function seleccionarMasaje(tipo){
document.getElementById("modalTranquilidad").style.display="none"
let precio = window._tranquilidadPrecio || 5600
agregar('Tranquilidad para dos - '+tipo,precio)
}

function enviar(){

let nombre=document.getElementById("nombre").value
let destinatario=document.getElementById("destinatario").value
let telefono=document.getElementById("telefono").value
let correo=document.getElementById("correo").value

if(!nombre || !telefono){
alert("Completa los datos obligatorios")
return
}

let mensaje="Solicitar Certificado Spa \n"

carrito.forEach(s=>{
mensaje+=s.nombre+" $"+s.precio+"\n"
})

mensaje+="Total $"+total+"\n"
mensaje+="Cliente "+nombre+"\n"
mensaje+="Destinatario "+destinatario+"\n"
mensaje+="Tel "+telefono+"\n"
mensaje+="Correo "+correo+"\n"

/* PROPINA */
let propinaSeleccion=document.querySelector('input[name="propina"]:checked')

if(propinaSeleccion){
if(propinaSeleccion.value==="si"){
let monto=document.getElementById("propinaMonto").value || 0
mensaje+="Propina: Sí $" + monto + "\n"
}else{
mensaje+="Propina: No\n"
}
}

let numero="5215580952588"

// ✅ encoding correcto
window.open(https://wa.me/${numero}?text=${encodeURIComponent(mensaje)})

}
