import { useEffect, useRef, useState } from "react";

function Editor() {

  const editorElement = useRef(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    editorElement.current.addEventListener('mouseup', (event) => {
      console.log(document.getSelection());
      setSelectedText(document.getSelection().toString());
    });
  }, []);

  return (
    <>
      <div className="editor" ref={editorElement}>
        This is an example text, you can select a part and add some feedbacks to it
      </div>

      <div style={{ marginTop: '3em' }}>
        Selected Text: <strong>{ selectedText }</strong>
      </div>

      <div style={{marginTop: '3em'}}>
        This text is out of the editor and must be unselectable
      </div>
    </>
  );
}

export default Editor;
