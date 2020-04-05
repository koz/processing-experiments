function keyPressed() {
  const title = document.getElementsByTagName('title')
  const titleName = title && title[0] && title[0].text ? _.camelCase(title[0].text) : ''
  const version = document.getElementById('version')
  const versionStr = version && version.content

  /* 's' letter */
  if (keyCode === 83) {
    const date = new Date()
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}@${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`

    const filename = [titleName, versionStr, dateStr].filter(Boolean).join('-')
    saveCanvas(`${filename}.png`)
  }

  /* redraw */
  if (keyCode === RETURN) {
    clear();
    setup();
    draw();
  }

  /* 'ctrl' key */
  if (keyCode === 17) {
    const date = new Date()
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}@${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`

    const filename = [titleName, versionStr, dateStr].filter(Boolean).join('-')
    save(`${filename}.svg`)
  }
}