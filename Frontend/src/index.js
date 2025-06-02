import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { exampleSetup } from "prosemirror-example-setup";
import { mySchema } from "./schema";

window.addEventListener("DOMContentLoaded", () => {
  const editorContainer = document.getElementById("editor");
  if (!editorContainer) return;

  new EditorView(editorContainer, {
    state: EditorState.create({
      doc: DOMParser.fromSchema(mySchema).parse(editorContainer),
      plugins: exampleSetup({ schema: mySchema })
    })
  });
});
// trigger build
// trigger build
// retry push
// retry push
