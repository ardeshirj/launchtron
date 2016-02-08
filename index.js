var buttons = document.querySelectorAll('.btn');

for (i = 0; i < buttons.length; i++) {
  buttons[i].onclick = pressedBtn;
}

function pressedBtn() {
  console.log(this.id + ' btn called me!');
}
