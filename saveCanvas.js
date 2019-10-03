function keyPressed() {
  /* 's' letter */
  if (keyCode === 83) {
    const date = new Date()
    saveCanvas(`${filename}-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}@${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.png`)
  }

  /* redraw */
  if (keyCode === RETURN) {
    clear();
    setup();
    draw();
  }
}