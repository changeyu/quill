import Quill from "./quill.js";
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['link', 'image', 'video', 'formula'],

  ['clean']                                         // remove formatting button
];
var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

hidden01.type = 'button'
hidden01.value = 'hidden'
hidden01.onclick=function(){
  quill.format('hidden', true, Quill.sources.USER)
}

hidden02.type = 'button'
hidden02.value = 'image'
hidden02.onclick = function () {
  // 得到当前焦点
  let range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'image', 'http://p1.qhimgs4.com/t012c5eb9785a974f5e.webp');
  quill.setSelection(range.index + 1, Quill.sources.USER);
}

hidden03.type = 'button'
hidden03.value = 'video-inline'
hidden03.onclick = function () {
  // 得到当前焦点
  let range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'videoinlineblock', '//player.bilibili.com/player.html?aid=23160898&cid=38545098&page=1');
  quill.setSelection(range.index + 1, Quill.sources.USER);
}

hidden04.type = 'button'
hidden04.value = 'video-block'
hidden04.onclick = function () {
  // 得到当前焦点
  let range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'video', '//player.bilibili.com/player.html?aid=23160898&cid=38545098&page=1');
  quill.setSelection(range.index + 1, Quill.sources.USER);
}
