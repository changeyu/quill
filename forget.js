class Blot {
  static blotName: string;
  static className: string;
  static tagName: string;
  static scope: Scope;

  domNode: Node;
  prev: Blot;
  next: Blot;
  parent: Blot;

  //创建相应的DOM节点
  static create(value?: any): Node;

  constructor(domNode: Node, value?: any);

  // For leaves, length of blot's value()
  //对于叶子，印迹值的长度（）
  // For parents, sum of children's values
  //对于父母来说，儿童价值的总和
  length(): Number;

  // Manipulate at given index and length, if applicable.
  //在给定的索引和长度下操作（如果适用）。
  // Will often pass call onto appropriate child.
  //经常会将呼叫转移到适当的孩子身上。
  deleteAt(index: number, length: number);
  formatAt(index: number, length: number, format: string, value: any);
  insertAt(index: number, text: string);
  insertAt(index: number, embed: string, value: any);

  // Returns offset between this blot and an ancestor's
  //返回此污点和祖先之间的偏移量
  offset(ancestor: Blot = this.parent): number;

  // Called after update cycle completes. Cannot change the value or length
  //在更新周期完成后调用。无法更改值或长度
  // of the document, and any DOM operation must reduce complexity of the DOM
  //文档的任何DOM操作都必须降低DOM的复杂度
  // tree. A shared context object is passed through all blots.
  //树。一个共享的上下文对象被传递通过所有的污点。
  // 优化
  optimize(context: {[key: string]: any}): void;

  // Called when blot changes, with the mutation records of its change.
  //当印迹发生变化时，调用它的变化记录。
  // Internal records of the blot values can be updated, and modifcations of
  //可以更新印迹值的内部记录以及修改
  // the blot itself is permitted. Can be trigger from user change or API call.
  //印迹本身是允许的。可以从用户更改或API调用触发。
  // A shared context object is passed through all blots.
  //共享上下文对象通过所有的印迹传递。
  update(mutations: MutationRecord[], context: {[key: string]: any});


  /** Leaf Blots only **/
  /** 仅限叶子印迹 **/

  // Returns the value represented by domNode if it is this Blot's type
  //如果它是这个Blot的类型，则返回由domNode表示的值
  // No checking that domNode can represent this Blot type is required so
  //不检查domNode是否可以表示此Blot类型是必需的
  // applications needing it should check externally before calling.
  //需要它的应用程序在调用之前应该在外部检查。
  static value(domNode): any;

  // Given location represented by node and offset from DOM Selection Range,
  // return index to that location.
  //给定位置由DOM选择范围中的节点和偏移量表示，
  //返回该位置的索引。
  index(node: Node, offset: number): number;

  // Given index to location within blot, return node and offset representing
  // that location, consumable by DOM Selection Range
  //给定位于污点内的位置索引，返回节点和偏移量表示
  //该位置，可通过DOM选择范围消耗
  position(index: number, inclusive: boolean): [Node, number];

  // Return value represented by this blot
  // Should not change without interaction from API or
  // user change detectable by update()
  //返回由此印迹表示的值
  //如果没有API或者交互的话，不应该改变
  //通过update（）可检测到用户更改
  value(): any;


  /** Parent blots only **/
  /** 仅母亲印迹 **/

  // Whitelist array of Blots that can be direct children.
  //可以是直接的孩子的白名单中的污点。
  static allowedChildren: Blot[];

  // Default child blot to be inserted if this blot becomes empty.
  //如果该污点变空，则插入默认的子污点。
  static defaultChild: string;

  children: LinkedList<Blot>;

  // Called during construction, should fill its own children LinkedList.
  //在施工期间调用，应该填写自己的子项LinkedList。
  build();

  // Useful search functions for descendant(s), should not modify
  //对后代有用的搜索功能，不应该修改
  descendant(type: BlotClass, index: number, inclusive): Blot
  descendents(type: BlotClass, index: number, length: number): Blot[];


  /** Formattable blots only **/
  /** 仅可格式化印迹 **/

  // Returns format values represented by domNode if it is this Blot's type
  // No checking that domNode is this Blot's type is required.
  //如果它是这个Blot的类型，则返回由domNode表示的格式值
  //不检查domNode是否需要Blot的类型。
  static formats(domNode: Node);

  // Apply format to blot. Should not pass onto child or other blot.
  // 将格式应用于印迹。不应传染给儿童或其他污点。
  format(format: name, value: any);

  // Return formats represented by blot, including from Attributors.
  // 返回由污点表示的格式，包括来自Attributors。
  formats(): Object;
}