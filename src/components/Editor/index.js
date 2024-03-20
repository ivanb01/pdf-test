import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichtextEditor({ label, value, onContentChange, height, id }) {
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        id={id}
        apiKey="6fbb5ydazy62w7lpag3txdszeyvqys6288392vd1e6acpxs7"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height: height ?? 350,
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
            'undo redo  blocks  bold italic forecolor  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onEditorChange={onContentChange}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
