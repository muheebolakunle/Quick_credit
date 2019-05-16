const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');
const closeButton2 = document.querySelector('.close-button2');
const verified = document.querySelector('#verify');

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function verify() {
  document.getElementById('user-status').innerHTML = 'Status: ' + 'VERIFIED';
}
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
closeButton2.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
verified.addEventListener('click', verify);

document.getElementById('apply').addEventListener('click', (e) => {
  e.preventDefault();
});


const show = (id) => {
  const e = document.getElementById(id);
  e.style.display = e.style.display == 'none' ? 'block' : 'block';
};
