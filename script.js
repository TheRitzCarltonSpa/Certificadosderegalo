let cart = [];
let total = 0;

// CONTEXTO GLOBAL
window.lastCategory = null;
window.lastName = null;

/* =========================
   🔵 SPLASH
========================= */
window.addEventListener("load", () => {
    setTimeout(()=>{
        document.getElementById("splash").classList.add("fade-out");
        setTimeout(()=>{
            document.getElementById("splash").style.display="none";
            document.getElementById("app").classList.add("show");
        },1000);
    },1500);
});

/* =========================
   📦 SERVICIOS COMPLETOS
========================= */

const servicios = {

bienestar:[
{nombre:"Ceremonia del despertar 90 min",precio:5000,desc:"Ceremonia diseñada para restaurar la vitalidad, promover el bienestar integral y reconectar el cuerpo, mente y espiritu."},
{nombre:"Ritual limpia Metzli 90 min",precio:5000,desc:"Inspirado en tradiciones Aztecas con salvia y piedras de sal."},
{nombre:"Facial resilencia natural 90 min",precio:5000,desc:"Tecnología prebiótica inspirada en Kobido japonés."}
],

masajes:[
{nombre:"Tranquilidad para dos",precio60:5600,precio90:7400,desc:"Experiencia en cabina de parejas."},
{nombre:"Masaje relajante",precio60:2400,precio90:3300,desc:"Relajación profunda."},
{nombre:"Masaje tejido profundo",precio60:2800,precio90:3700,desc:"Alivio muscular."},
{nombre:"Masaje antiestrés",precio60:2600,precio90:3500,desc:"Revitalización."},
{nombre:"Masaje recuperacion muscular",precio60:2800,precio90:3700,desc:"Para deportistas."},
{nombre:"Masaje para caballero",precio60:2900,precio90:3800,desc:"Incluye piedras calientes."},
{nombre:"Masaje piedras calientes",precio:3600,desc:"Relajación profunda."},
{nombre:"Masaje prenatal",precio60:2400,precio90:3300,desc:"Para embarazadas."}
],

faciales:[
{nombre:"Facial Personalizado",precio60:2600,precio90:3500,desc:"Adaptado a la piel."},
{nombre:"Facial Anti-edad",precio60:3300,precio90:4500,desc:"Anti envejecimiento."},
{nombre:"Facial Rejuvenecedor 90 min",precio:4000,desc:"Resultados inmediatos."},
{nombre:"Hydrafacial",precio60:4500,desc:"Tecnología avanzada."},
{nombre:"Facial Para caballero 60 min",precio:2600,desc:"Energía inmediata."},
{nombre:"Facial Revitalizante",precio25:1200,precio40:1800,desc:"Rápido y eficaz."}
],

corporales:[
{nombre:"Envoltura corporal ESPA 60 min",precio:2800,desc:"Renueva la piel."},
{nombre:"Tratamiento corporal equilibrante 60 min",precio:2600,desc:"Relajación total."},
{nombre:"Tratamiento corporal nutritivo 60 min",precio:2600,desc:"Piel luminosa."},
{nombre:"Power hour 60 min",precio:2400,desc:"Estimulación total."}
],

mejoras:[
{nombre:"Cepillado corporal",precio:300,desc:"Renueva piel"},
{nombre:"Piedras calientes",precio:300,desc:"Relajación"},
{nombre:"Mascarilla plástica",precio:400,desc:"Nutrición"},
{nombre:"Aromaterapia",precio:300,desc:"Aceites"},
{nombre:"Mascarilla 111skin",precio:500,desc:"Hidratación"},
{nombre:"Exfoliación manos/pies/espalda",precio:450,desc:"Suavidad"},
{nombre:"Balsamo cuello y escote",precio:300,desc:"Firmeza"},
{nombre:"Parches ojos",precio:400,desc:"Mejora tono"},
{nombre:"Limpieza facial express",precio:300,desc:"Revitaliza rostro"},
{nombre:"Rodillo de jade",precio:300,desc:"Tonifica piel"},
{nombre:"Balsamo muscular",precio:450,desc:"Recuperación"},
{nombre:"Acondicionador cabello",precio:300,desc:"Cabello sano"},
{nombre:"Balsamo reafirmante",precio:450,desc:"Hidratación profunda"}
]

};

/* =========================
   🧴 GENERAR UI
========================= */

const cont = document.getElementById("categorias");

Object.keys(servicios).forEach(cat=>{

    let div = document.createElement("div");
    div.className = "categoria";

    div.innerHTML = `
        <div class="categoria-header" style="background-image:url('imagenes/${cat}.jpg')">
            <h3>${cat.toUpperCase()}</h3>
        </div>

        <div class="tratamientos">
            ${generarServicios(cat)}
        </div>
    `;

    div.querySelector(".categoria-header").onclick = ()=>{

        const content = div.querySelector(".tratamientos");

        if(div.classList.contains("active")){
            content.style.height="0px";
            div.classList.remove("active");
        } else {
            content.style.height=content.scrollHeight+"px";
            div.classList.add("active");
        }
    };

    cont.appendChild(div);
});

/* =========================
   🔥 GENERADOR DINÁMICO
========================= */

function generarServicios(cat){

    return servicios[cat].map(serv=>{

        let botones="";

        if(serv.precio){
            botones+=`
            <button onclick="handleAdd('${cat}','${serv.nombre}',${serv.precio})">
                $${serv.precio}
            </button>`;
        }

        Object.keys(serv).forEach(k=>{
            if(k.startsWith("precio") && k!=="precio"){
                let dur=k.replace("precio","");
                let val=serv[k];

                botones+=`
                <button onclick="handleAdd('${cat}','${serv.nombre} ${dur}min',${val})">
                    ${dur}min $${val}
                </button>`;
            }
        });

        return `
        <div class="tratamiento">
            <div>
                <strong>${serv.nombre}</strong>
            </div>
            <div>
                ${botones}
                <button onclick="openDetail(\`${serv.desc}\`)">Detalle</button>
            </div>
        </div>`;
    }).join("");
}

/* =========================
   🧠 CONTROL DE MEJORAS
========================= */

function handleAdd(cat,name,price){

    const conMejoras=["masajes","faciales","corporales"];

    if(conMejoras.includes(cat)){
        openUpgrade(cat,name,price);
    } else {
        addToCart(name,price);
    }
}

/* =========================
   🛒 CARRITO
========================= */

function addToCart(name,price){
    cart.push({name,price});
    total+=price;
    renderCart();
}

function renderCart(){

    let div = document.getElementById("cart");
    div.innerHTML = "";

    cart.forEach((item,i)=>{

        div.innerHTML += `
        <div class="cart-item">
            <span class="cart-name">${item.name}</span>

            <span class="cart-price">$${item.price}</span>

            <button class="remove-btn" onclick="removeItem(${i})">×</button>
        </div>`;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

function removeItem(i){
    total-=cart[i].price;
    cart.splice(i,1);
    renderCart();
}

/* =========================
   💎 MEJORAS + RECOMENDACIÓN
========================= */

function openUpgrade(cat,name,price){

    window.lastCategory=cat;
    window.lastName=name;

    let div=document.getElementById("upgradeOptions");
    div.innerHTML="";

    servicios.mejoras.slice(0,5).forEach(m=>{
        div.innerHTML+=`
        <button onclick="selectUpgrade('${name}','${m.nombre}',${price},${m.precio})">
        ${m.nombre} +$${m.precio}
        </button>`;
    });

    document.getElementById("upgradeModal").style.display="block";
}

function selectUpgrade(name,upgrade,price,extra){
    addToCart(name+" + "+upgrade,price+extra);
    closeUpgrade();

    setTimeout(()=>{
        showRecommendations(window.lastCategory,name);
    },300);
}

function closeUpgrade(){
    document.getElementById("upgradeModal").style.display="none";

    if(window.lastCategory){
        setTimeout(()=>{
            showRecommendations(window.lastCategory,window.lastName);
        },300);
    }
}

/* =========================
   💡 RECOMENDACIONES
========================= */

const recomendaciones={
    masajes:["Aromaterapia","Piedras calientes","Balsamo muscular"],
    faciales:["Mascarilla 111skin","Parches ojos","Rodillo de jade"],
    corporales:["Exfoliación","Balsamo reafirmante","Cepillado corporal"]
};

function showRecommendations(cat,name){

    let list=recomendaciones[cat];
    if(!list) return;

    let div=document.getElementById("recommendOptions");
    div.innerHTML="";

    list.forEach(n=>{
        let item=servicios.mejoras.find(m=>m.nombre.includes(n));

        if(item){
            div.innerHTML+=`
            <button onclick="addRecommended('${name}','${item.nombre}',${item.precio})">
            + ${item.nombre} ($${item.precio})
            </button>`;
        }
    });

    document.getElementById("recommendModal").style.display="block";
}

function addRecommended(base,name,price){
    addToCart(base+" + "+name,price);
    closeRecommend();
}

function closeRecommend(){
    document.getElementById("recommendModal").style.display="none";
}

/* =========================
   🌑 MODAL
========================= */

function openDetail(text){
    document.getElementById("modal").style.display="block";
    document.getElementById("modalText").innerText=text;
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

/* =========================
   💰 PROPINA
========================= */

function toggleTip(){
    let val=document.getElementById("tipOption").value;
    document.getElementById("tipAmount").style.display=val==="Si"?"block":"none";
}

/* =========================
   📲 WHATSAPP
========================= */

function sendWhatsApp(){

    let tel=document.getElementById("telefono").value;
    let tip=document.getElementById("tipAmount").value||0;

    let msg="Pedido Spa:\n\n";

    cart.forEach(i=>{
        msg+=`${i.name} - $${i.price}\n`;
    });

    msg+=`\nTotal: $${total}`;
    msg+=`\nPropina: $${tip}`;

    window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(msg)}`);
}
