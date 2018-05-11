import Quill from "./quill.js";
import pretty from 'pretty';
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
  theme: 'snow',
});

quill.on('text-change', function (delta, oldDelta, source) {
  console.log(quill.editor.delta)
  console.log(JSON.stringify(quill.editor.delta))
  // console.log(editor.getElementsByTagName('div')[0].innerHTML)
  outer.innerText = pretty(editor.getElementsByTagName('div')[0].innerHTML)
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
  quill.insertEmbed(range.index, 'video-inline', '//player.bilibili.com/player.html?aid=23160898&cid=38545098&page=1');
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

hidden05.type = 'button'
hidden05.value = 'setcontent'
hidden05.onclick = function () {
  // 得到当前焦点
  let json = '{"ops":[{"insert":"Hello World!asdf"},{"insert":"\n","attributes":{"hidden":"bullet"}},{"insert":{"image":"http://p1.qhimgs4.com/t012c5eb9785a974f5e.webp"}},{"insert":"\n","attributes":{"hidden":"bullet"}},{"insert":{"video-inline":"//player.bilibili.com/player.html?aid=23160898&cid=38545098&page=1"}},{"insert":"11"},{"insert":"\n","attributes":{"hidden":"bullet"}},{"insert":{"video":"//player.bilibili.com/player.html?aid=23160898&cid=38545098&page=1"}},{"insert":"\n","attributes":{"hidden":"bullet"}}]}'
  let testData = JSON.parse(json.replace(/\n+/g, '\\n'));
  quill.setContents([{
    insert: 'Hello',
    attributes: {align: "left" }
  }, {
    insert: 'World',
    attributes: { bold: true, align: "center"}
  }, 
  { insert: "\n", attributes: { align: "center" }},
  {
    insert: {
      image: 'http://p1.qhimgs4.com/t012c5eb9785a974f5e.webp'
    },
    attributes: { width: '100' ,align:"center"}
  },
  {
    insert: {
      image: 'https://i0.hdslb.com/bfs/archive/a45404c76c668b11de6ac335967ab2debf8ad708.jpg'
    },
    attributes: { width: '100' ,align:"center"}
  }
])
}


