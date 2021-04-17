import { BaseElement, Editor, Range, Text, Transforms } from "slate"

export const insertBlock = (editor: Editor, slateElement: BaseElement, range: Range) => {
  const [node] = Editor.node(editor, range)
  if (node && Text.isText(node) && node.text === "") {
    const [parent] = Editor.parent(editor, range)
    Transforms.unsetNodes(editor, Object.keys(parent), { at: range })
    Transforms.setNodes(editor, slateElement, { at: range })
  } else {
    Transforms.insertNodes(editor, slateElement, { at: range })
  }
}

export const setBlock = (editor: Editor, slateElement: BaseElement, range: Range) => {
  const [node] = Editor.node(editor, range)
  if (!Editor.isEditor(node)) {
    const [parent] = Editor.parent(editor, range)
    Transforms.unsetNodes(editor, Object.keys(parent), { at: range })
  }
  Transforms.setNodes(editor, slateElement, { at: range })
}
