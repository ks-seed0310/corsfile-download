messageAllow=window.messageAllow||[//["origin"...]
  "https://ks-seed0310.github.io",
  "http://ks-seed0310.github.io",
  "https://ochcinfo.github.io",
  "http://ochcinfo.github.io",
  "https://ioself.github.io",
  "http://ioself.github.io"
]
messageChildWindow=window.messageChildWindow||{}//{"origin":element.contentWindow...}
let _messageRecept=(e)=>{}
window.addEventListener("message",e=>{
  if (typeof e.data!=="object"||e.data.author!=="corsFileDownload")return
  if (!messageAllow.includes(e.origin)){
    console.warn("Status 403: Error Forbidden\n\tOrigin that sent the message: ",e.origin,"\n\tOrigin that received the message: ",location.origin,"Message Not Resolved.")
    return
  }
  _messageRecept(e)
})
async function fileDownload(url_){
  const url=new URL(url_,document.baseURI)
  if (url.origin===location.origin){
    const el=document.createElement("a")
    el.download=""
    el.href=url
    el.click()
    return true
  }else{
    const child=messageChildWindow[url.origin]
    if (!child){
      console.warn("Origin: ",url.origin,"Not registered.\nFile download has been canceled.\nPlease add a new item ",url.origin," and contentWindow to messageChildWindow.")
      return false
    }
    const res=await new Promise(r=>{
      _messageRecept=(e)=>{
        r(200)
      }
      child.postMessage({url:url.href,author:"corsFileDownload",author2:"ParentNode"},url.origin)
    })
    if (res===200){
      return true
    }else{
      return res
    }
  }
}
