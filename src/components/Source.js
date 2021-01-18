import { useEffect } from 'react';
import { ControlledEditor } from "@monaco-editor/react";
import SourceData from '../samples/source-object';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Source = ({editorRef, watcher, validationErrors}) => {

    const handleEditorDidMount = (e, editor) => {
        editor.getModel().onDidChangeContent(watcher);
        editorRef.current = editor;
        
        //First run:
        watcher();       
    };

    useEffect(() => {
        return () => {
            editorRef.current.dispose();
        }
    }, [editorRef]);

    return (
        <div className="sourceBlock">

            <div onClick={watcher} className={validationErrors? "validationErrors error": "validationErrors"}>
                {!validationErrors && (<FontAwesomeIcon icon={faThumbsUp} />)}
                {validationErrors && validationErrors.map((error, index) => (<div key={index}>{error.message}</div>))}
            </div>

            <div className="editorWrapper">
                <ControlledEditor
                    width="800"
                    height="120vh"
                    language="json"
                    theme="vs-light"
                    value={SourceData}
                    editorDidMount={handleEditorDidMount}
                />
            </div>
                  

        </div>
    );
}

export default Source;