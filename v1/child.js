messageAllow=window.messageAllow||[]//["origin"...]]
const dl=document.createElement("a")
dl.download=""
window.addEventListener("message",e=>{
  if (typeof e.data!=="object"||e.data.author!=="corsFileDownload")return
  if (!messageAllow.includes(e.origin)){
    console.warn("Status 403: Error Forbidden\n\tOrigin that sent the message: ",e.origin,"\n\tOrigin that received the message: ",location.origin,"Message Not Resolved.")
    return
  }
  dl.href=e.data.url||""
  dl.click()
  e.source.postMessage({author:"corsFileDownload",author2:"ChildNode"},e.origin)
})
