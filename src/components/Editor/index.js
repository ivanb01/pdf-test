import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichtextEditor({ label, value, onContentChange, height, id }) {
  const editorRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector('.mce-edit-focus');
      console.log(element, 'Element');
      if (element) {
        console.log('test');
        element.focus();
      }
    }, 4000);
  }, []);

  return (
    <Editor
      id={'richTextId'}
      apiKey="6fbb5ydazy62w7lpag3txdszeyvqys6288392vd1e6acpxs7"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      init={{
        auto_focus: 'richTextId',
        height: height ?? 350,
        border: true,
        highlight_on_focus: true,
        branding: false,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | variables | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        toolbar_mode: 'wrap',
        statusbar: false,
        setup: (editor) => {
          editor.ui.registry.addMenuButton('variables', {
            text: 'Variables',
            fetch: (callback) => {
              const items = [
                {
                  type: 'menuitem',
                  text: 'Client First Name',
                  onAction: () => editor.insertContent('{{client_first_name}}'),
                },
                {
                  type: 'menuitem',
                  text: 'Client Last Name',
                  onAction: () => editor.insertContent('{{client_last_name}}'),
                },
                {
                  type: 'menuitem',
                  text: 'Client Full Name',
                  onAction: () => editor.insertContent('{{client_name}}'),
                },
                {
                  type: 'menuitem',
                  text: 'Agent First Name',
                  onAction: () => editor.insertContent('{{agent_first_name}}'),
                },
                {
                  type: 'menuitem',
                  text: 'Agent Last Name',
                  onAction: () => editor.insertContent('{{agent_last_name}}'),
                },
                {
                  type: 'menuitem',
                  text: 'Agent Full Name',
                  onAction: () => editor.insertContent('{{agent_name}}'),
                },
              ];
              callback(items);
            },
          });
        },
      }}
      onEditorChange={onContentChange}
    />
  );
}
