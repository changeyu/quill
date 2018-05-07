import Quill from "./quill.js";
var quill = new Quill('#editor', {
  theme: 'snow'
});
hidden01.type = 'button'
hidden01.value = 'hidden'
hidden01.onclick=function(){
  quill.format('hidden',true)
}
console.log('index')