import { useCallback, useEffect, useRef, useState } from 'react';
import Source from './Source';
import Jsonata from 'jsonata';
import { monaco } from "@monaco-editor/react";
import Transform from './Transform';
import Target from './Target';
import validator from 'json-schema-remote';
import sourceSchemaFile from './../samples/source-object-schema';
import targetSchemaFile from './../samples/target-object-schema';


const Playground = () => {

    const [sourceSchema, setSourceSchema] = useState(JSON.stringify(sourceSchemaFile, null, 2));
    const [targetSchema, setTargetSchema] = useState(JSON.stringify(targetSchemaFile, null, 2));

    const [schemaEditor, setSchemaEditor] = useState(false);

    const [targetValidationErrors, setTargetValidationErrors] = useState();
    const [sourceValidationErrors, setSourceValidationErrors] = useState();

    const sourceEditorRef = useRef();
    const jsonataEditorRef = useRef();
    const targetEditorRef = useRef();

    const transform = useCallback(() => {

        try {

            if(sourceEditorRef.current && jsonataEditorRef.current && targetEditorRef.current) {

                let sourceValue = sourceEditorRef.current.getValue();
                let jsonataValue = jsonataEditorRef.current.getValue();

                let jsonSource = JSON.parse(sourceValue);
                let expression = Jsonata(jsonataValue);
                let targetJson = expression.evaluate(jsonSource);

                /**
                 * Validate against schema and output result in target editor
                 */
                validator.validate(jsonSource, JSON.parse(sourceSchema), (error, isValid) => {
                    setSourceValidationErrors(isValid? null:error.errors);
                });
                
                validator.validate(targetJson, JSON.parse(targetSchema), (error, isValid) => {
                    setTargetValidationErrors(isValid? null:error.errors);
                });
                
                targetEditorRef.current.getModel().setValue(JSON.stringify(targetJson, null, 2))
            }
            
        } catch(e) {
            console.log(e);
            setSourceValidationErrors([{message:e.message}]);
        }
    },[sourceSchema, targetSchema]);

    useEffect(() => {
        
        monaco.init().then(monaco => {

            monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                validate: false,
                schemas: [],
                enableSchemaRequest: false
            });
    
        });

    }, []);

    return (
        <div className="container">
            <div className="editors">

                <div className="editorBlock">
                    <div onClick={() => setSchemaEditor(!schemaEditor)} className="schema">
                        Schema
                    </div>
                        
                    <textarea style={{display: (schemaEditor? 'block':'none')}} value={sourceSchema} onChange={(e) => setSourceSchema(e.target.value)} />
                    <Source editorRef={sourceEditorRef} watcher={transform} validationErrors={sourceValidationErrors}/>
                </div>

                <div className="editorBlock">
                    <Transform editorRef={jsonataEditorRef} watcher={(e) => {transform();}} />
                </div>

                <div className="editorBlock">
                    <div onClick={() => setSchemaEditor(!schemaEditor)} className="schema">
                        Schema
                    </div>
                    
                    <textarea style={{display: (schemaEditor? 'block':'none')}} value={targetSchema} onChange={(e) => {setTargetSchema(e.target.value);}} />
                    <Target editorRef={targetEditorRef} validationErrors={targetValidationErrors} />
                </div>

            </div>
        </div>
    );
}

export default Playground;