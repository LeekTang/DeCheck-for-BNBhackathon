export function toShort(item, num) {
  return Number(item).toFixed(num)
}

export function abbr(item) {
  return item.substring(0, 4) + '...' + item.substring(item.length - 4);
}

export function imgError(e) {
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

//复制内容到剪切板
export function copyToClipBoard(textToCopy) {
  const tmpTextField = document.createElement("textarea")
  tmpTextField.textContent = textToCopy
  tmpTextField.setAttribute("style", "position:absolute; right:200%;")
  document.body.appendChild(tmpTextField)
  tmpTextField.select()
  tmpTextField.setSelectionRange(0, 99999)
  document.execCommand("copy")
  tmpTextField.remove()
}

// 根据文件名后缀区分 文件类型
/*
 * @param: fileName - 文件名称
 * @param: 数据返回 1) 无后缀匹配 - false
 * @param: 数据返回 2) 匹配图片 - image
 * @param: 数据返回 3) 匹配 txt - txt
 * @param: 数据返回 4) 匹配 excel - excel
 * @param: 数据返回 5) 匹配 word - word
 * @param: 数据返回 6) 匹配 pdf - pdf
 * @param: 数据返回 7) 匹配 ppt - ppt
 * @param: 数据返回 8) 匹配 视频 - video
 * @param: 数据返回 9) 匹配 音频 - radio
 * @param: 数据返回 10) 其他匹配项 - other
 */
export function matchType(fileName) {
  // 后缀获取
  var suffix = '';
  // 获取类型结果
  var result = '';
  try {
    var flieArr = fileName.split('.');
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) {
    result = false;
    return result;
  }
  // 图片格式
  var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  // 进行图片匹配
  result = imglist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'image';
    return result;
  };
  // 匹配txt
  var txtlist = ['txt'];
  result = txtlist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'txt';
    return result;
  };
  // 匹配 excel
  var excelist = ['xls', 'xlsx'];
  result = excelist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'excel';
    return result;
  };
  // 匹配 word
  var wordlist = ['doc', 'docx'];
  result = wordlist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'word';
    return result;
  };
  // 匹配 pdf
  var pdflist = ['pdf'];
  result = pdflist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'pdf';
    return result;
  };
  // 匹配 ppt
  var pptlist = ['ppt'];
  result = pptlist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'ppt';
    return result;
  };
  // 匹配 视频
  var videolist = ['mp4', 'm2v', 'mkv'];
  result = videolist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'video';
    return result;
  };
  // 匹配 音频
  var radiolist = ['mp3', 'wav', 'wmv'];
  result = radiolist.some(function (item) {
    return item == suffix;
  });
  if (result) {
    result = 'radio';
    return result;
  }
  // 其他 文件类型
  result = 'other';
  return result;
}

export function getColor(val) {
  return '#' + getHashCode(val).toString(16).substr(0,6)
}

function getHashCode (str) {
  var hash = 1315423911,i,ch;
  for (i = str.length; i >= 0; i--){
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return (hash & 0x7FFFFFFF)
}

export const webList = [
  {chain: '1', web: 'https://etherscan.io/',suffix: '#balances', priceLabel: 'eth'},
  {chain: '10', web: 'https://optimistic.etherscan.io/',suffix: '#balances', priceLabel: 'Optimism' },
  {chain: '25', web: 'https://cronoscan.com/',suffix: '#balances', priceLabel: 'cro'},
  {chain: '56', web: 'https://bscscan.com/',suffix: '#balances', priceLabel: 'bsc'},
  {chain: '100', web: 'https://blockscout.com/xdai/mainnet/',suffix: '/token-holders', priceLabel: 'xdai'},
  {chain: '128', web: 'https://www.hecoinfo.com/en-us/',suffix: '?tab=Holders', priceLabel: 'heco' },
  {chain: '137', web: 'https://polygonscan.com/address',suffix: '#balances', priceLabel: 'polygon_pos'},
  {chain: '250', web: 'https://ftmscan.com/',suffix: '#balances', priceLabel: 'ftm'},
  {chain: '321', web: 'https://explorer.kcc.io/en/',suffix: '', priceLabel: 'kcc'},
  {chain: '324', web: 'https://explorer.zksync.io/',suffix: '#transactions', priceLabel: 'zksync'},
  {chain: '201022', web: 'https://fonscan.io/',suffix: '/token-holders', priceLabel: 'eth' },
  {chain: '42161', web: 'https://arbiscan.io/',suffix: '#balances', priceLabel: 'arbitrum'},
  {chain: '43114', web: 'https://avascan.info/blockchain/all/',suffix: '/holders', priceLabel: 'avax'},
  {chain: '1666600000', web: 'https://explorer.harmony.one/',suffix: '?activeTab=4', priceLabel: 'one'},
  {chain: 'tron', web: 'https://tronscan.org/#/',suffix: '/holders', priceLabel: 'eth' },
]