const humedadDato = document.getElementById('humDato')
const humedadIcon = document.getElementById('humIcon')


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/humedad/guardar");
            const dato = await response.json();
            if((dato[0].lectura >= 30 && dato[0].lectura<=60) || dato[0].lectura === -1){
                humedadDato.classList.remove("text-danger")
                humedadDato.classList.add("text-primary")
                humedadIcon.classList.add("bg-light")
                humedadIcon.classList.remove("bg-danger")  
            }else{
                humedadDato.classList.remove("text-primary")
                humedadDato.classList.add("text-danger")
                humedadIcon.classList.remove("bg-light")
                humedadIcon.classList.add("bg-danger")
            }
            if(dato[0].lectura === -1){
                humedadDato.innerText = "Apagado"
                hum = document.getElementById('humSensor')
                hum.checked = false
            }else{
                humedadDato.innerText = dato[0].lectura  
                hum.checked = true
            }
        }catch(e){
            humedadDato.classList.remove("text-danger")
            humedadDato.classList.add("text-primary")
            humedadIcon.classList.add("bg-light")
            humedadIcon.classList.remove("bg-danger") 
            humedadDato.innerText = "Apagado"
            hum = document.getElementById('humSensor')
            hum.checked = false 
        }   
        await sleep(1000)
    }
}

recibirInformacion()