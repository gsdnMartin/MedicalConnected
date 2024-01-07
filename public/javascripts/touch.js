const touchDato = document.getElementById('touchDato')
const touchIcon = document.getElementById('touchIcon')

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
                touchDato.innerText = "OK"
            }else{
                touchDato.classList.remove("text-primary")
                touchDato.classList.add("text-danger")
                touchIcon.classList.remove("bg-light")
                touchIcon.classList.add("bg-danger")
                touchDato.innerText = "Alerta" 
            }
        }catch(e){
            touchDato.classList.remove("text-danger")
            touchDato.classList.add("text-primary")
            touchIcon.classList.add("bg-light")
            touchIcon.classList.remove("bg-danger")  
            touchDato.innerText = "--"
        }   
        await sleep(1000)
    }
}


recibirInformacion()

