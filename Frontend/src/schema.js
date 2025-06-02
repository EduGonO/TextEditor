import { Schema } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";

export const mySchema = new Schema({
  nodes: addListNodes(
    basicSchema.spec.nodes.append({
      todo_item: todoItem
    }),
    "paragraph block*",
    "block"
  ),
  marks: basicSchema.spec.marks
});

export const todoItem = {
  attrs: { checked: { default: false } },
  content: "paragraph",
  toDOM: node => [
    "li",
    { "data-type": "todo-item" },
    ["input", {
      type: "checkbox",
      checked: node.attrs.checked ? "checked" : null,
      onclick: "window.toggleTodo && window.toggleTodo(this)"
    }],
    ["div", 0]
  ],
  parseDOM: [{
    tag: "li[data-type=todo-item]",
    getAttrs(dom) {
      const input = dom.querySelector("input[type=checkbox]");
      return { checked: input?.checked };
    }
  }]
};