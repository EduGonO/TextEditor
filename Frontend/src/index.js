import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { toggleMark } from "prosemirror-commands";
import { wrapInList } from "prosemirror-schema-list";
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

  window.editor = editor;

  window.toggleMark = function(mark) {
    const markType = mySchema.marks[mark];
    if (!markType) return;
    const cmd = toggleMark(markType);
    if (cmd) cmd(editor.state, editor.dispatch);
  };

  window.wrapList = function(nodeType) {
    const listType = mySchema.nodes[nodeType];
    if (!listType) return;
    const cmd = wrapInList(listType);
    if (cmd) cmd(editor.state, editor.dispatch);
  };
});
