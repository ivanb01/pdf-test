import { createEditor, DecoratorNode } from 'lexical';
import { Suspense, lazy } from 'react';
import uuid from 'react-uuid';

const ImageComponent = lazy(() => import('../SignatureComponent'));

function convertImageElement(domNode) {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src } = domNode;
    const node = $createImageNode({ altText, src });
    return { node };
  }
  return null;
}

export class SignatureNode extends DecoratorNode {
  constructor(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key,
    textValue,
    label,
    name,
    inputType,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
    this.__id = uuid();
    this.__formType = 'signature';
    this.__textValue = textValue;
    this.__label = label;
    this.__name = name;
    this.__inputType = inputType;
  }
  static getType() {
    return 'image';
  }

  static clone(node) {
    return new SignatureNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key,
      node.__type,
      node.__formType,
      node.__textValue,
      node.__label,
      node.__name,
      node.__inputType,
    );
  }

  static importJSON(serializedNode) {
    const { altText, height, width, maxWidth, caption, src, showCaption, formType, textValue, label, name, inputType } =
      serializedNode;
    const node = $createSignatureNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
      formType,
      textValue,
      label,
      name,
      inputType,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  exportDOM() {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('id', this.__id);
    return { element };
  }

  static importDOM() {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
      id: this.__id,
      formType: this.__formType,
      textValue: this.__textValue,
      label: this.__label,
      name: this.__name,
      inputType: this.inputType,
    };
  }

  setWidthAndHeight(width, height) {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  setShowCaption(showCaption) {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  createDOM(config) {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getAltText() {
    return this.__altText;
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          captionsEnabled={this.__captionsEnabled}
          resizable={true}
        />
      </Suspense>
    );
  }
}

export function $createSignatureNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
  textValue,
  label,
  name,
  inputType,
}) {
  const newSignatureNode = new SignatureNode(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key,
    textValue,
    label,
    name,
    inputType,
  );

  return newSignatureNode;
}

export function $isSignatureNode(node) {
  return node instanceof SignatureNode;
}
