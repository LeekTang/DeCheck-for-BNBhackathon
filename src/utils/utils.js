export function toShort (item, num) {
  return Number(item).toFixed(num)
}

export function abbr (item) {
  return item.substring(0,4) + '...' + item.substring(item.length - 4);
}

export function imgError (e) {
  e.srcElement.src = '/images/defa.png'
}