const spo2Dato = document.getElementById('spo2Dato')
const spo2Icon = document.getElementById('spo2Icon')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/spo2/guardar");
            const dato = await response.json();
            if((dato[0].lectura >= 92 && dato[0].lectura<=100) || dato[0].lectura === -1){
                spo2Dato.classList.remove("text-danger")
                spo2Dato.classList.add("text-primary")
                spo2Icon.classList.remove("bg-danger")
                spo2Icon.classList.add("bg-light")
            }else{
                spo2Dato.classList.remove("text-primary")
                spo2Dato.classList.add("text-danger")
                spo2Icon.classList.remove("bg-light")
                spo2Icon.classList.add("bg-danger")
            }
            spo2Sensor = document.getElementById('spo2Sensor')
            if(dato[0].lectura === -1){
                spo2Dato.innerText = "Apagado"
                spo2Sensor.checked = false
            }else{
                spo2Dato.innerText = dato[0].lectura + ' %'
                spo2Sensor.checked = true
            }
        }catch{
            spo2Dato.classList.remove("text-danger")
            spo2Dato.classList.add("text-primary")
            spo2Icon.classList.remove("bg-danger")
            spo2Icon.classList.add("bg-light")
            spo2Dato.innerText = "Apagado"
            spo2Sensor = document.getElementById('spo2Sensor')
            spo2Sensor.checked = false
        }
        
        await sleep(1000)
    }
}


recibirInformacion()

