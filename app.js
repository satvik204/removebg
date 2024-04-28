//All variables and consts

const Api_Key = "sk-proj-SHHMTWcKafu8YWJaPJEPT3BlbkFJ2NJqiQ9u1QxQ8UN0JSMq";
const button = document.querySelector(".button")
const mainimage = document.querySelector(".main-image")
const containimage = document.querySelector(".contain-image")
const input = document.querySelector(".input");
let downloadurl;
let downloadurl2;

//addEventListener
button.addEventListener('click', ()=>{
console.log("Working");
if(input.files.length > 2 ){ 
   alert("Only 2 photos at a time.")
}else{
   for (let i = 0; i < input.files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(input.files[i])
      reader.onload = () => {
         const image = document.createElement("img");
         image.setAttribute("src",reader.result);
         mainimage.appendChild(image)
      }
      console.log(i);

      if (i === 0) {
         for (let index = 0; index < input.files.length; index++) {
            const image = document.createElement("img");
            image.setAttribute("src","./giphy.gif");
            containimage.appendChild(image)
            
         }
      }
      setTimeout(()=> {
         const img = input.files[i];
         const formData = new FormData();
         formData.append("image_file",img);
         formData.append('size','auto');
         console.log(formData);
        const apiKey = "yqcyotuBfYKUAskA7NUGS2SG"
         fetch('https://api.remove.bg/v1.0/removebg',{
           method:'POST',
           headers:{
               'X-Api-Key':apiKey,
     
           },
           body: formData
         })
        .then(function(response){
           return response.blob();
        })
        .then(function (finalResponse) {
           console.log(finalResponse);
           const url  = URL.createObjectURL(finalResponse);
           if (i === 1) {
           downloadurl2 = url
            
           }else{
           downloadurl = url
   
           }
           if (i === 0 ) {
         containimage.innerHTML = " ";
            
           }
           if (i === 0) {
            
           
           const h1 = document.createElement("h1");
           h1.innerText = "Removed Image";
           containimage.appendChild(h1);
         }
           const image = document.createElement("img");
           image.setAttribute("src",url);
           containimage.appendChild(image)
        })
        .catch();
      },2000)
        
   }
}
   
})

const download  = document.querySelector(".btn")

const filenameinput  = document.querySelector(".filename")
download.addEventListener('click',() => {
  if (filenameinput.value === "") {
    alert("Please enter a file name")
  }else{
   const anchorElement = document.createElement('a');
   anchorElement.href = downloadurl;
   const d = new Date;
   anchorElement.download = `${filenameinput.value}.png`;
   document.body.appendChild(anchorElement);

   anchorElement.click();
   document.body.removeChild(anchorElement);
   if (input.files.length = 2) {
      const anchorElement = document.createElement('a');
   anchorElement.href = downloadurl2;
   const d = new Date;
   anchorElement.download = `${filenameinput.value}2.png`;
   document.body.appendChild(anchorElement);

   anchorElement.click();
   document.body.removeChild(anchorElement);
    } }
})