import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { exampleSetup } from "prosemirror-example-setup";
import { mySchema } from "./schema";

window.addEventListener("DOMContentLoaded", () => {
  const editorContainer = document.getElementById("editor");
  if (!editorContainer) return;

  const editor = new EditorView(editorContainer, {
    state: EditorState.create({
      doc: DOMParser.fromSchema(mySchema).parse(editorContainer),
      plugins: exampleSetup({ schema: mySchema })
    })
  });

  // Expose editor and commands to window
  window.editor = editor;
  window.toggleMark = function(mark) {
    const { state, dispatch } = editor;
    const markType = mySchema.marks[mark];
    if (!markType) return;
    const cmd = toggleMark(markType);
    if (cmd) cmd(state, dispatch);
  };
  window.wrapList = function(listType) {
    const { state, dispatch } = editor;
    const nodeType = mySchema.nodes[listType];
    if (!nodeType) return;
    const cmd = wrapInList(nodeType);
    if (cmd) cmd(state, dispatch);
  };
});
// trigger build
// trigger build
// retry push
// retry push
