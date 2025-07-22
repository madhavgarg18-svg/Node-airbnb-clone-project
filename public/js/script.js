// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


//   const textOnlyFields = ["title", "description", "location", "country"];

//   textOnlyFields.forEach(id => {
//     document.getElementById(id).addEventListener("keypress", function (e) {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!regex.test(e.key)) {
//         e.preventDefault(); // block number/symbol
//       }
//     });
//   });


    let Toggleswitch=document.getElementById("switchCheckDefault");
        Toggleswitch.addEventListener("click",()=>{
            let elements=document.getElementsByClassName("gst");
            for(let ele of elements){
                if(ele.style.display !="inline"){
                     ele.style.display="inline";
                }
                else{
                   ele.style.display="none"; 
                }
               
            }
        })

