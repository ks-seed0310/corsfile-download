let messageAllow=window.messageAllow||[//["origin"...]
  "https://ks-seed0310.github.io",
  "http://ks-seed0310.github.io",
  "https://ochcinfo.github.io",
  "http://ochcinfo.github.io",
  "https://ioself.github.io",
  "http://ioself.github.io"
]
const dl=document.createElement("a")
dl.download=""
window.addEventListener("message",e=>{
  if (typeof e.data!=="object"||e.data.author!=="corsFileDownload")return
  if (!messageAllow.includes(e.origin)){
    console.warn("Status 403: Error Forbidden\n\tOrigin that sent the message: ",location.origin,"\n\tOrigin that received the message: ",e.origin,"Message Not Resolved.")
    return
  }
  dl.href=e.data.url||""
  dl.click()
  e.source.postMessage({author:"corsFileDownload",author2:"ChildNode"},e.origin)
})
