document.getElementById("apply").addEventListener("click", function(e) {
    e.preventDefault();
  });



function show(id) {
    let e = document.getElementById(id);
    e.style.display = e.style.display == "none" ? "block" : "block";
  }
  
