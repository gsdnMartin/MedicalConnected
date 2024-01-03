const touchDato = document.getElementById('touchDato')
const touchIcon = document.getElementById('touchIcon')
const banner = document.getElementById('bannerAlert')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/touch/alert");
            const dato = await response.json();
            if(!dato[0].estado){
                touchDato.classList.remove("text-danger")
                touchDato.classList.add("text-primary")
                touchIcon.classList.add("bg-light")
                touchIcon.classList.remove("bg-danger")  
                banner.classList.add("visually-hidden")
                touchDato.innerText = "OK"
            }else{
                touchDato.classList.remove("text-primary")
                touchDato.classList.add("text-danger")
                touchIcon.classList.remove("bg-light")
                touchIcon.classList.add("bg-danger")
                banner.classList.remove("visually-hidden")
                banner.innerText = "Alerta" 
                touchDato.innerText = "Alerta" 
            }
        }catch(e){
            console.log("Hola error")
            await sleep(4000)
        }   
        await sleep(1000)
    }
}


recibirInformacion()

