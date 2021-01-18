import { useEffect } from 'react';
import { ControlledEditor } from "@monaco-editor/react";
import JsonataData from './../samples/jsonata-data';


const Transform = ({editorRef, watcher}) => {

    const handleEditorDidMount = (e, editor) => {
        editor.getModel().onDidChangeContent(watcher);
        editorRef.current = editor;
    };

    useEffect(() => {
        return () => {
            editorRef.current.dispose();
        }
    }, [editorRef]);

    return (
        <div className="transformBlock">
            <div className="validationErrors"></div>

            <div className="editorWrapper">
                <ControlledEditor
                    width="800"
                    height="128vh"
                    language="json"
                    theme="vs-light"
                    value={JsonataData}
                    editorDidMount={handleEditorDidMount}
                />    
            </div>
                  

        </div>
    );
}

export default Transform;