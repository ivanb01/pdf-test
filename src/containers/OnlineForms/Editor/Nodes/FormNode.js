import { TextNode } from 'lexical';
import uuid from 'react-uuid';
import { $createFormElementNode } from '../Plugins/FormPlugin';
export class FormNode extends TextNode {
  constructor(payload, key) {
    super(payload.text, key);
    this.__id = uuid();
    this.__inputType = payload.inputType;
    this.__label = payload.label;
    this.__name = payload.name;
    this.__formType = 'text';
  }

  static getType() {
    return 'formNode';
  }

  static clone(node) {
    const {
      __id: id,
      __text: text,
      __type: type,
      __key: key,
      __label: label,
      __inputType: inputType,
      __name: name,
      __formType: formType,
    } = node;
    return new FormNode(
      {
        id,
        text,
        label,
        name,
        inputType,
        type,
        formType,
      },
      key,
    );
  }

  static importJSON(serializedNode) {
    return $createFormElementNode(serializedNode);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'formNode',
      formType: this.__formType,
      version: 1,
      id: this.__id,
      inputType: this.__inputType,
      label: this.__label,
      name: this.__name,
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
