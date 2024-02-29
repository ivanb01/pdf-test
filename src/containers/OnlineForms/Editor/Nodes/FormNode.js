import { TextNode } from 'lexical';
import uuid from 'react-uuid';
import { $createFormElementNode } from '../Plugins/FormPlugin';
export class FormNode extends TextNode {
  constructor(text, key) {
    super(text, key);
    this.__id = uuid();
    this.__formType = 'text';
  }

  static getType() {
    return 'formNode';
  }

  static clone(node) {
    return new FormNode(node.__text, node.__key);
  }

  static importJSON(serializedNode) {
    return $createFormElementNode(serializedNode.text);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'formNode',
      formType: this.__formType,
      version: 1,
      id: this.__id,
    };
  }

  createDOM(config) {
    const element = document.createElement('span');
    element.innerText = `${this.__text}`;
    element.className = config.theme.formElement;
    element.name = 'form-element';
    element.readonly = 'readonly';
    return element;
  }

  updateDOM(prevNode, dom, config) {
    const isUpdated = super.updateDOM(prevNode, dom, config);
    return isUpdated;
  }
}
