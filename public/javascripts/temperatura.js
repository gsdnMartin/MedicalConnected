const temperaturaDato = document.getElementById('temperaturaDato')
const temperaturaIcon = document.getElementById('temperaturaIcon')


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/temperatura/guardar");
            const dato = await response.json();
            if((dato[0].lectura >= 35 && dato[0].lectura<=38) || dato[0].lectura === -1){
                temperaturaDato.classList.remove("text-danger")
                temperaturaDato.classList.add("text-primary")
                temperaturaIcon.classList.add("bg-light")
                temperaturaIcon.classList.remove("bg-danger")  
            }else{
                temperaturaDato.classList.remove("text-primary")
                temperaturaDato.classList.add("text-danger")
                temperaturaIcon.classList.remove("bg-light")
                temperaturaIcon.classList.add("bg-danger")
            }
            if(dato[0].lectura === -1){
                temperaturaDato.innerText = "Apagado"
                temp = document.getElementById('tempSensor')
                temp.checked = false
            }else{
                temperaturaDato.innerText = dato[0].lectura  
                temp.checked = true
            }
        }catch(e){
            temperaturaDato.classList.remove("text-danger")
            temperaturaDato.classList.add("text-primary")
            temperaturaIcon.classList.add("bg-light")
            temperaturaIcon.classList.remove("bg-danger") 
            temperaturaDato.innerText = "Apagado"
            temp = document.getElementById('tempSensor')
            temp.checked = false
        }   
        await sleep(1000)
    }
}


recibirInformacion()

