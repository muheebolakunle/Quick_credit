document.getElementById("apply").addEventListener("click", function(e) {
    e.preventDefault();
  });



const show = (id) => {
    let e = document.getElementById(id);
    e.style.display = e.style.display == "none" ? "block" : "block";
  }

  function verify() {
    if(document.getElementById('verify').checked === true){
      document.getElementById('user-status').innerHTML = 'Status: '+ 'VERIFIED'; 
    }else{
      document.getElementById('user-status').innerHTML = 'Status: '+ 'Unverified'; 
    }
  }
  
  
