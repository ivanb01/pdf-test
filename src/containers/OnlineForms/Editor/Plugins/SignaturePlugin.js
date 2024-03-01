import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';
import { useEffect } from 'react';
import { SignatureNode } from '../Nodes/SignatureNode';
import { $createSignatureNode } from '../Nodes/SignatureNode';

export const INSERT_SIGNATURE_COMMAND = createCommand('INSERT_SIGNATURE_COMMAND');

export default function SignaturePlugin({ captionsEnabled }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([SignatureNode])) {
      throw new Error('Signature Node: SignatureNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_SIGNATURE_COMMAND,
        (payload) => {
          const signature = $createSignatureNode(payload);
          $insertNodes([signature]);
          if ($isRootOrShadowRoot(signature.getParentOrThrow())) {
            $wrapNodeInElement(signature, $createParagraphNode).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [captionsEnabled, editor]);

  return null;
}
