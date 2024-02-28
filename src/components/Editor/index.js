import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichtextEditor({ label, value }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="6fbb5ydazy62w7lpag3txdszeyvqys6288392vd1e6acpxs7"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        init={{
          height: 350,
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
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}
