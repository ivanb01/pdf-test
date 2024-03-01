import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setEditorState, setFormField } from '@store/editor/slice';
import { $nodesOfType } from 'lexical';
import { FormNode } from '../Nodes/FormNode';
import { SignatureNode } from '../Nodes/SignatureNode';

export function EditorUpdateListenerPlugin({ initialValue }) {
  const [editor] = useLexicalComposerContext();
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    return () => {
      firstRender.current = true;
    };
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (firstRender.current) {
        editor.update(() => {
          if (initialValue) {
            const oldState = editor.parseEditorState(initialValue);
            editor.setEditorState(oldState);
          }
        });
      } else {
        editorState.read(() => {
          dispatch(setEditorState(editorState.toJSON()));
        });
      }
      firstRender.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, dispatch]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const formNodesFound = $nodesOfType(FormNode); // get all AbbreviationNode nodes

        const formNodes = formNodesFound.reduce((formNodes, currentFormNode) => {
          const { __id: id, __text: textValue, __type: type, __key: key } = currentFormNode;
          return {
            ...formNodes,
            [key]: {
              id,
              type,
              formType: textValue === 'Date' ? 'date' : 'text',
              textValue,
              key,
            },
          };
        }, {});

        const signatureNodesFound = $nodesOfType(SignatureNode);
        const signatueNodes = signatureNodesFound.reduce((signatueNodes, currentSignatureNode) => {
          const {
            __id: id,
            __textValue: signatureTextValue,
            __type: type,
            __formType: formType,
            __key: keyValue,
          } = currentSignatureNode;
          return {
            ...signatueNodes,
            [keyValue]: {
              id,
              type,
              formType,
              textValue: signatureTextValue,
              key: keyValue,
            },
          };
        }, {});
        dispatch(setFormField({ ...formNodes, ...signatueNodes }));
      });
    });
  }, []);

  return null;
}
