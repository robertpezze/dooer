import { useEffect } from 'react';
import { ControlledEditor } from "@monaco-editor/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Target = ({editorRef, validationErrors}) => {

    const handleEditorDidMount = (e, editor) => {
        editorRef.current = editor;        
    };

    useEffect(() => {
        return () => {
            editorRef.current.dispose();
        }
    }, [editorRef]);

    return (
        <div className="targetBlock">

            <div className={validationErrors? "validationErrors error": "validationErrors"}>
                {!validationErrors && <FontAwesomeIcon icon={faThumbsUp} />}
                {validationErrors && validationErrors.map((error, index) => (<div key={index}>{error.message}</div>))}
            </div>

            <div className="editorWrapper">
                <ControlledEditor
                    width="800"
                    height="120vh"
                    language="json"
                    theme="vs-light"
                    options={{readOnly: true}}
                    editorDidMount={handleEditorDidMount}
                />          
            </div>
            

        </div>
    );
}

export default Target;