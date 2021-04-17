import { BaseElement, Editor, Node, Text } from "slate"

// https://github.com/ianstormtaylor/slate/issues/3457
export const wrapInlineAndText = (
  editor: Editor,
  fragment: Node[],
  pusher: (children: (Text | BaseElement)[]) => BaseElement
): BaseElement[] => {
  let non_blocks: (Text | BaseElement)[] = []
  const blocks: BaseElement[] = []
  const pushNewBlock = () => {
    if (non_blocks.length === 0) {
      return
    }
    const item = pusher(non_blocks)
    blocks.push(item)
    non_blocks = []
  }

  fragment.forEach((f) => {
    if (Text.isText(f) || Editor.isInline(editor, f)) {
      non_blocks.push(f)
    } else {
      pushNewBlock()
      blocks.push(f)
    }
  })

  pushNewBlock()

  return blocks
}
