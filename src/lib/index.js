export const getTramsfromStyle = num => {
  debugger
  if (!num) return {}
  const key = Object.keys(num)
  const transfromObj = {}
  let result = ''
  key.forEach(i => {
    transfromObj[i] = true
    switch (i) {
      case 'rotate': {
        result = result.concat(`rotate(` + num[i] + 'deg)' + ' ')
      }
      case 'translateX': {
        result = result.concat('translateX(' + num[i] + 'px)' + ' ')
      }
      case 'brightness': {
        result = result.concat(`brightness(${num[i]}%)`)
      }
    }
  })
  return { result, transfromObj }
}
