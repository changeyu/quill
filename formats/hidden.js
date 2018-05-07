import Parchment from 'parchment';
import Block from '../blots/block';
import Container from '../blots/container';


class HiddenItem extends Block {
  static formats(domNode) {
    return domNode.tagName === this.tagName ? undefined : super.formats(domNode);
  }

  format(name, value) {
    if (name === HiddenBox.blotName && !value) {
      this.replaceWith(Parchment.create(this.statics.scope));
    } else {
      super.format(name, value);
    }
  }

  remove() {
    if (this.prev == null && this.next == null) {
      this.parent.remove();
    } else {
      super.remove();
    }
  }

  replaceWith(name, value) {
    this.parent.isolate(this.offset(this.parent), this.length());
    if (name === this.parent.statics.blotName) {
      this.parent.replaceWith(name, value);
      return this;
    } else {
      this.parent.unwrap();
      return super.replaceWith(name, value);
    }
  }
}
HiddenItem.blotName = 'hidden-item';
HiddenItem.className = 'hidden-item';
HiddenItem.tagName = 'DIV';


class HiddenBox extends Container {
  static create(value) {
    // console.log(value)
    // let tagName = 'DIV';
    let node = super.create(value);
    
    return node;
  }

  // 获取formats 类型  几种 bullet ordered unchecked checked false
  static formats(domNode) {
    return 'bullet';
  }

  constructor(domNode) {
    super(domNode);
  }

  format(name, value) {
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  insertBefore(blot, ref) {
    if (blot instanceof HiddenItem) {
      super.insertBefore(blot, ref);
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      after.parent.insertBefore(blot, after);
    }
  }

  optimize(context) {
    super.optimize(context);
    let next = this.next;
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}
HiddenBox.blotName = 'hidden';
HiddenBox.scope = Parchment.Scope.BLOCK_BLOT;
HiddenBox.tagName = 'DIV';
HiddenBox.className = 'hidden-box';
HiddenBox.defaultChild = 'hidden-item';
HiddenBox.allowedChildren = [HiddenItem];


export { HiddenItem, HiddenBox as default };
