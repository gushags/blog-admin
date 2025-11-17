// WritePost.jsx
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PreviewPost from '../PreviewPost/PreviewPost';

function WritePost() {
  const TINY_API_KEY = import.meta.env.VITE_TINY_API_KEY;
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(() => {
    return (
      localStorage.getItem('draftPost') ||
      '<p>This is the initial content of the editor.</p>'
    );
  });

  const editorRef = useRef(null);

  return (
    <>
      {isEdit ? (
        <>
          <label htmlFor='title'>Blog Title</label>
          <input
            id='title'
            contentEditable
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <Editor
            apiKey={TINY_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={content}
            onEditorChange={(v) => {
              setContent(v);
              localStorage.setItem('draftPost', v);
            }}
            init={{
              height: 500,
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
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <button
            onClick={() => {
              console.log(content);
              setIsEdit(!isEdit);
            }}
          >
            Preview
          </button>
        </>
      ) : (
        <PreviewPost
          title={title}
          setTitle={setTitle}
          setContent={setContent}
          content={content}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />
      )}
    </>
  );
}

export default WritePost;
