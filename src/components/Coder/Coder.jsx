import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "./Coder.css";

const Coder = () => {
  const livePreviewRef = useRef(null);
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);

  useEffect(() => {
    // Initialize live preview iframe
    const initializeLivePreview = () => {
      const iframe = livePreviewRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.body.innerHTML = "";
      const styleElement = document.createElement("style");
      styleElement.setAttribute("id", "live-preview-style");
      doc.head.appendChild(styleElement);

      const pagedJsScript = document.createElement("script");
      pagedJsScript.src = "https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js";
      doc.head.appendChild(pagedJsScript);
    };

    // Initialize CodeMirror editors
    const initializeCodeEditors = () => {
      const defaultOptions = (overrides) => ({
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        theme: "mdn-like",
        ...overrides,
      });

      const codeEditors = {
        html: CodeMirror(htmlEditorRef.current, defaultOptions({ mode: "text/html", value: "" })),
        css: CodeMirror(cssEditorRef.current, defaultOptions({ mode: "css", value: "" })),
        js: CodeMirror(jsEditorRef.current, defaultOptions({ mode: "javascript", value: "" })),
      };

      // Update live preview for each editor
      codeEditors.html.on("change", () => {
        const iframe = livePreviewRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.body.innerHTML = codeEditors.html.getValue();
      });

      codeEditors.css.on("change", () => {
        const iframe = livePreviewRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const styleElement = doc.getElementById("live-preview-style");
        styleElement.innerHTML = codeEditors.css.getValue();
      });

      codeEditors.js.on("change", () => {
        const iframe = livePreviewRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const scriptElement = document.createElement("script");
        scriptElement.innerHTML = codeEditors.js.getValue();
        doc.body.appendChild(scriptElement);
      });

      return codeEditors;
    };

    initializeLivePreview();
    initializeCodeEditors();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <div className="main-title">Live Code Editor</div>
        </div>
      </div>

      <div className="code-box">
        <div className="editor" id="html" ref={htmlEditorRef}></div>
        <div className="editor" id="css" ref={cssEditorRef}></div>
        <div className="editor" id="js" ref={jsEditorRef}></div>
      </div>

      <div className="preview">
        <iframe id="live-preview" ref={livePreviewRef}></iframe>
      </div>
    </div>
  );
};

export default Coder;