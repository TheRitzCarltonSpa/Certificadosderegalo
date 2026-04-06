let carrito=[]
let total=0
let sugerenciaMostrada=false

function seleccionarValor(valor){
document.getElementById("valorCertificado").value=valor
}

function agregarCertificado(){
let valor=document.getElementById("valorCertificado").value
if(valor==""){alert("Ingrese un monto");return}
agregar("Certificado $" + valor,parseFloat(valor))
document.getElementById("valorCertificado").value=""
}

const servicios={

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en las tradiciones Aztecas e influenciado por el poder y el simbolismo de la luna llena (Metztli). Ritual profundamente curativo y meditativo, se define por la circuralidad fluida de sus movimientos de masaje y la utilización de salvia purificadora y piedras de sal, para limpiar el cuerpo y la mente de pensamientos y sentimientos que ya no nos sirven."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Este tratamiento facial especializado es el enfoque completo para la salud de la piel, ya que utiliza tecnología de vanguardia pre y pro biótica combinada con los mismos beneficios del ejercicio físico para desintoxicar, vigorizar, esculpir y relajar. Poderosas técnicas para desafiar la edad inspiradas en el Kobido japones."}
],

masajes:[
{nombre:"Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Comparta una maravillosa experiencia de masaje lado a lado de una persona especial en nuestra cabina de parejas"},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Masaje de presion suave para una relajación profunda"},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Masaje de presion profunda para aliviar la tension muscular"},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Masaje tradicional de presión moderada a firme, que deja una sensacion de revitalizacion y relajacion"},
{nombre:"Masaje recuperacion muscular",precio60:2800,precio90:3700,desc:"Recargue su cuerpo con este masaje diseñado para aliviar la tensión acumulada en los músculos. Usando movimientos profundos y técnicas de estiramiento concentradas en áreas especificas para ayudar a aliviar las molestias comunes y la tensión relacionada con el deporte."},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Masaje cuerpo completo de presión moderada a fuerte, que incluye piedras calientes en zona de espalda, masaje facial y masaje capilar para un balance corporal relajante"},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Masaje terapéutico y rejuvenecedor con presión de moderada a firme que intensifica la relajacion de los músculos cansados y adoloridos"},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Suave masaje totalmente a la mendida ideal para las mujeres embarazadas después del primer trimestre."},
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Este facial purifica, hidrata, ilumina y suavisa el cutis adaptandose a sus necesidades."},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Tratamiento facial que combate al instante los signos del envejecimiento, suaviza las líneas de expresión y reactiva la luminosidad del cutis."},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Restaura la vitalidad y revela una piel brillante, lisa y de aspecto juvenil. Es un tratamiento imprescindible para obtener resultados inmediatos para un evento especial."},
{nombre:"Hydrafacial",precio60:4500,desc:"Es un tratamiento no avasivo y no quirúrgico que ofrece resultados instantáneos."},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Limpia profundamente hidrata y suaviza la piel, dejando el cutis con energía al instante."},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Purifique, hidrate, ilumine y alise su cutis con este rápido y eficaz tratamiento facial."}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Purifiqque su cuerpo o renueve profundamente su piel con esta envoltura corporal personalizada."},
{nombre:"Tratamiento corporal equilibrante 60 min",precio:2600,desc:"Restaure la serenidad del cuerpo y la mente a través de este delicioso tratamiento de espalda, cuello y cabeza reviviéndolos en balance."},
{nombre:"Tratamiento corporal nutritivo 60 min",precio:2600,desc:"Luzca una piel luminosa y mas suave que nunca con un exfoliante corporal y la aplicacion profunda de un aceite nutritivo. Como toque final disfrute de un masaje personalizado de espalda."},
{nombre:"Power hour 60 min",precio:2400,desc:"Este tratamiento intensamente estimulante, purificante y calmante, le activará de forma poderosa, dejándole listo para cualquier actividad deseada."}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300,desc:"Mejora el tono e impulsa la renovación celular para una piel mas suave, tersa y radiante"},
{nombre:"Piedras calientes",precio:300,desc:"Las piedras de basalto lisas irradian calor profundo dentro de los músculos para aliviar la tensión y el estrés durante cualquier masaje"},
{nombre:"Mascarilla plástica",precio:400,desc:"Ayuda a tener una piel mas suave y nutrida"},
{nombre:"Aromaterapia",precio:300,desc:"Potencie cualquier tratameinto con un aceite especifico para cada estado de animo"},
{nombre:"Mascarilla 111skin",precio:500,desc:"Hidrata y suaviza tu piel añadiendo a tu tratamiento facial"},
{nombre:"Exfoliación manos, pies o espalda",precio:450,desc:"Revele la suavidad de su piel con este tratamiento exfoliante y nutritivo, que le devolverá a sus manos o pies una apariencia suave y delicada"},
{nombre:"Balsamo de cuello y escote",precio:300,desc:"Luz y firmeza a su piel"},
{nombre:"Parches de ojos",precio:400,desc:"Mejora la apariencia dando mejor tono"},
{nombre:"Limpieza facial express",precio:300,desc:"Una mejora ideal para complementar su masaje, que revitaliza el rostro en pocos minutos. Incluye limpieza profunda, exfoliación suave y aplicacion de productos hidratantes que dejan la piel fresca,luminosa y renovada sin interrumpir la experiencia de relajación."},
{nombre:"Tonificacion facial con rodillo de jade",precio:300,desc:"Esculpe y tonifica los musculos faciales, estimuelando la microcirculación y revitalizando la piel mediante la integracion de estas antiguas herramientas chinas a su tratamiento facial"},
{nombre:"Balsamo de rescate muscular",precio:450,desc:"Potencie cualquier masaje incorporando este balsamo que contiene una refrescante mezcla de Menta, Eucalipto y Brote de clavo para recargar y restaurar cuerpo y mente."},
{nombre:"Acondicionador del cuero cabelludo y cabello",precio:300,desc:"Potencialice su masaje de cuero cabelludo reduciondo la tencion con este acondicionador, utilizando las propiedades fortalecedoras del berro,rico en vitamina C y la arcilla roja, con la finalidad de dejar un cabello sano y hermoso."},
{nombre:"Balsamo corporal reafirmante",precio:450,desc:"Combine los beneficios sublimes de una crema reafirmante con un aceite de masaje corporal que proporcionan una hidratación rica en refina y suaviza la textura de la piel."}
]

}

function mostrar(cat){

let html=""

servicios[cat].forEach(s=>{

if(s.precio60 && s.precio90){

html+=`
<div class="card">
<h3>${s.nombre}</h3>
<button class="agregar" onclick="agregar('${s.nombre} 60 min',${s.precio60})">60 min $${s.precio60}</button>
<button class="agregar" onclick="agregar('${s.nombre} 90 min',${s.precio90})">90 min $${s.precio90}</button>
<button class="detalle" onclick="detalle('${s.nombre}','${s.desc}')">Detalle</button>
</div>
`

}else{

html+=`
<div class="card">
<h3>${s.nombre}</h3>
<button class="agregar" onclick="agregar('${s.nombre}',${s.precio}')">$${s.precio}</button>
<button class="detalle" onclick="detalle('${s.nombre}',${s.desc}')">Detalle</button>
</div>
`

}

})

document.getElementById("servicios").innerHTML=html

}

/* SEGURIDAD */
detalle('${escapeHTML(s.nombre)}','$
{escapeHTML(s.desc)}')
}

/* RECOMENDACION INTELIGENTE*/

function recomendarMejoras(nombre){

let texto=nombre.toLowerCase()

/*RECOMENDACION PARA FACIAL */

if(texto.includes("facial") || texto.includes("hydrafacial"))
{

document.getElementById("tituloMejoras").innerText="Potencia tu facial"

document.getElementById("opcionesMejoras").innerHTML=`

<button class="boton-dorado" onclick="agregar('Mascarilla 111skin',500); cerrarMejoras()">
Mascarilla 111skin $500</button>
<button class="boton-dorado" onclick="agregar('Tonificacion facial con rodillo de jade',300); cerrarMejoras()">
Tonificacion facial con rodillo de jade $300</button>
<button class="boton-dorado" onclick="agregar('Mascarilla plástica',400); cerrarMejoras()">
Mascarilla plastica $400</button>

`

}else{

document.getElementById("tituloMejoras").innerText="Mejora tu masaje"

document.getElementById("opcionesMejoras").innerHTML=`

<button class="boton-dorado" onclick="agregar('Aromaterapia',300); cerrarMejoras()">Aromaterapia $300</button>
<button class="boton-dorado" onclick="agregar('Piedras calientes',300); cerrarMejoras()">
Piedras calientes $300</button>
<button class="boton-dorado" onclick="agregar('Cepillado corporal',300); cerrarMejoras()">
Cepillado corporal $300</button>

`

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
lista.innerHTML=""
total=0

carrito.forEach((item,i)=>{

total+=item.precio

lista.innerHTML+=`

<div class="item-carrito">

${item.nombre} $${item.precio}

<button class="eliminar" onclick="eliminar(${i})">X</button>

</div>

`

})

document.getElementById("total").innerText=total

}

/* PROPINA */
function togglePropina(mostrar){
document.getElementById("propinaMonto").style.display=mostrar?"block":"none"
}

function detalle(t,d){
document.getElementById("titulo").innerText=t
document.getElementById("descripcion").innerText=d
document.getElementById("modal").style.display="flex"
}

function cerrar(){
document.getElementById("modal").style.display="none"

}

function enviar(){

let nombre=document.getElementById("nombre").value
let destinatario=document.getElementById("destinatario").value
let telefono=document.getElementById("telefono").value
let correo=document.getElementById("correo").value

let mensaje="Solicitar Certificado Spa %0A"

carrito.forEach(s=>{
mensaje+=s.nombre+" $"+s.precio+"%0A"
})

mensaje+="Total $"+total+"%0A"
mensaje+="Cliente "+nombre+"%0A"
mensaje+="Destinatario "+destinatario+"%0A"
mensaje+="Tel "+telefono+"%0A"
mensaje+="Correo "+correo

/* PROPINA */
let propinaSeleccion=document.querySelector('input[name="propina"]:checked')

if(propinaSeleccion){
if(propinaSeleccion.value==="si"){
let monto=document.getElementById("propinaMonto").value || 0
mensaje+="Propina: Sí $" + monto + "%0A"
}else{
mensaje+="Propina: No%0A"
}
}

let numero="5215580952588"

window.open(`https://wa.me/${numero}?text=${mensaje}`)

}
