export function toShort (item, num) {
  return Number(item).toFixed(num)
}

export function abbr (item) {
  return item.substring(0,4) + '...' + item.substring(item.length - 4);
}

export function imgError (e) {
  e.srcElement.src = '/images/defa.png'
}

export function timestampToTime(timestamp) {
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  var date = new Date(timestamp);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

export function copyToClipBoard(textToCopy){
  const tmpTextField = document.createElement("textarea")
  tmpTextField.textContent = textToCopy
  tmpTextField.setAttribute("style","position:absolute; right:200%;")
  document.body.appendChild(tmpTextField)
  tmpTextField.select()
  tmpTextField.setSelectionRange(0, 99999)
  document.execCommand("copy")
  tmpTextField.remove()
}