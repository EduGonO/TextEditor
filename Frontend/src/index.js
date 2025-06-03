import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { exampleSetup } from "prosemirror-example-setup";
import { toggleMark } from "prosemirror-commands";
import { liftListItem, wrapInList } from "prosemirror-schema-list";
import { mySchema } from "./schema";
import { setBlockType, wrapIn } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { sinkListItem } from "prosemirror-schema-list";

console.log("✅ JS STARTED");

window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM Ready, mySchema nodes:", Object.keys(mySchema.nodes || {}));
  console.log("✅ mySchema marks:", Object.keys(mySchema.marks || {}));

  const editorContainer = document.getElementById("editor");
  if (!editorContainer) {
    console.error("❌ Editor container not found");
    return;
  }

const editor = new EditorView(editorContainer, {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(editorContainer),
    plugins: exampleSetup({ schema: mySchema })
  })
});

  window.editor = editor;

  window.toggleMark = function(mark) {
    const type = mySchema.marks[mark];
    if (!type) return;
    const cmd = toggleMark(type);
    cmd(editor.state, editor.dispatch);
  };

  window.wrapList = function(nodeType) {
    const { state, dispatch } = editor;
    const listType = mySchema.nodes[nodeType];
    if (!listType) return;

    const isInList = state.selection.$from.path.some(n => n.type === listType);
    if (isInList) {
      // Remove list by lifting items out
      const itemType = mySchema.nodes.list_item;
      if (itemType) {
        liftListItem(itemType)(state, dispatch);
      }
    } else {
      wrapInList(listType)(state, dispatch);
    }
  };

  window.wrapInBlock = function(nodeType) {
    const type = mySchema.nodes[nodeType];
    if (!type) return;
    const cmd = wrapIn(type);
    cmd(editor.state, editor.dispatch);
  };

  window.setBlock = function(nodeType, attrs = {}) {
    const type = mySchema.nodes[nodeType];
    if (!type) return;
    const cmd = setBlockType(type, attrs);
    cmd(editor.state, editor.dispatch);
  };

  window.undo = function() {
    undo(editor.state, editor.dispatch);
  };

  window.redo = function() {
    redo(editor.state, editor.dispatch);
  };

  window.insertLink = function(href) {
    const { schema, state, dispatch } = editor;
    const markType = schema.marks.link;
    if (!markType) return;

    const { from, to } = state.selection;
    dispatch(state.tr.addMark(from, to, markType.create({ href })));
  };
  window.indent = function() {
    const { state, dispatch } = editor;
    const itemType = mySchema.nodes.list_item;
    if (itemType) sinkListItem(itemType)(state, dispatch);
  };

  window.toggleTodo = function(input) {
    const pos = editor.posAtDOM(input.closest("li"), 0);
    const node = editor.state.doc.nodeAt(pos);
    const tr = editor.state.tr.setNodeMarkup(pos, null, {
      ...node.attrs,
      checked: !node.attrs.checked
    });
    editor.dispatch(tr);
  };

  window.insertTodo = function() {
    const { state, dispatch } = editor;
    const type = mySchema.nodes.todo_item;
    if (!type) return;
    dispatch(state.tr.replaceSelectionWith(type.createAndFill()));
  };

  window.outdent = function() {
    const { state, dispatch } = editor;
    const itemType = mySchema.nodes.list_item;
    if (itemType) liftListItem(itemType)(state, dispatch);
  };
  window.editorReady = true;
});