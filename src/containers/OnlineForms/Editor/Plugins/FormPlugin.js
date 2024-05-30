import { COMMAND_PRIORITY_LOW, createCommand, $getSelection, $insertNodes, TextNode, KEY_DOWN_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { FormNode } from '../Nodes/FormNode';

export function $createFormElementNode(payload) {
  const newNode = new FormNode(payload);

  return newNode;
}

export function $isFormElementNode(node) {
  return node instanceof FormNode;
}

export const INSERT_FORM_ELEMENT_COMMAND = createCommand('insertForm');

export function FormElementPlugin() {
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNodes([FormNode])) {
    throw new Error('NodePlugin: FormNode not registered on editor');
  }

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        const selection = $getSelection();

        const anchor = selection?.anchor;
        if (anchor) {
          const currentNode = anchor.getNode();

          if (currentNode.getType() === 'formNode') {
            if (event.key === 'Backspace' && anchor.offset) {
              editor.update(() => {
                currentNode.remove(false);
              });
            } else if (event.key === 'ArrowLeft' && !anchor.offset) {
              const newNode = new TextNode(' ');
              currentNode.insertBefore(newNode);
              newNode.select();
            } else if (
              event.key !== 'ArrowLeft' &&
              event.key !== 'ArrowRight' &&
              event.key !== 'ArrowTop' &&
              event.key !== 'ArrowDown'
            ) {
              editor.update(() => {
                const nextSibling = currentNode.getNextSibling();
                if (nextSibling) {
                  const nextTextNode = new TextNode(' ');
                  nextSibling.insertBefore(nextTextNode);
                  nextTextNode.select();
                }
              });
            }
          }
        }

        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      INSERT_FORM_ELEMENT_COMMAND,
      (payload) => {
        editor.update(() => {
          const formNode = $createFormElementNode(payload);
          const nextTextNode = new TextNode(' ');
          $insertNodes([formNode, nextTextNode]);
          nextTextNode.select();
        });
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}
