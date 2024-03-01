import { useState } from 'react';
import Theme from './Theme/Theme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import ToolbarPlugin from './Plugins/ToolbarPlugin';
import { FormElementPlugin } from './Plugins/FormPlugin';
import { FormNode } from './Nodes/FormNode';
import { SignatureNode } from './Nodes/SignatureNode';
import SignaturePlugin from './Plugins/SignaturePlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import TableActionMenuPlugin from './TableActionMenu';
import { EditorUpdateListenerPlugin } from './Plugins/EditorUpdateListenerPlugin';

function Placeholder() {
  return <div className="editor-placeholder">Enter new form...</div>;
}

const editorConfig = {
  theme: Theme,
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
    FormNode,
    SignatureNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ],
};

export default function Editor({ initialEditorState }) {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="my-[20px] flex flex-col	divide-y mx-auto max-w-[770px] leading-5 relative rounded-tl-sm font-normal border-gray20 border-[1px]">
        <ToolbarPlugin />
        <div className="relative bg-white">
          <RichTextPlugin
            contentEditable={
              <div ref={onRef}>
                <ContentEditable
                  style={{ tabSize: 1, fontFamily: 'Poppins' }}
                  className="min-h-[600px] resize-none text-[15px] relative outline-0	py-[15px] p-2.5"
                />
              </div>
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <ClearEditorPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <FormElementPlugin />
          <SignaturePlugin />
          <TablePlugin />
          <EditorUpdateListenerPlugin initialValue={initialEditorState} />
        </div>
        {floatingAnchorElem && <TableActionMenuPlugin anchorElem={floatingAnchorElem} />}
      </div>
    </LexicalComposer>
  );
}
