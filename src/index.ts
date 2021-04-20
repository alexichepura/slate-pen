import { createElement } from "react"
import { BaseElement, Editor, Element as SlateElement } from "slate"
import { RenderElementProps as SlateRenderElementProps, RenderLeafProps } from "slate-react"


export type SlatePenRenderElementProps<T = Element> = {
  children: any
  element: T
} & SlateRenderElementProps

export type TRenderElement<T = SlateElement> = (
  props: SlatePenRenderElementProps<T>
) => JSX.Element | null
export type TRenderLeaf = (props: RenderLeafProps) => JSX.Element | null
export type TExtendEditor = (editor: Editor, slatePen: SlatePen) => void

export type TSlatePlugin<T = BaseElement> = {
  extendEditor?: TExtendEditor
  RenderElement?: TRenderElement<T>
  RenderLeaf?: TRenderLeaf
}

type TSlatePenInit = {
  editor: Editor
  plugins?: TSlatePlugin<any>[]
}

export class SlatePen {
  editor: Editor
  private _plugins: TSlatePlugin<any>[] = []
  private _plugins_RenderElement: TRenderElement[] = []
  private _plugins_RenderLeaf: TRenderLeaf[] = []

  constructor(init: TSlatePenInit) {
    this.editor = init.editor
    if (init.plugins) {
      init.plugins.forEach(this.addPlugin)
    }
  }

  addPlugin = (plugin: TSlatePlugin<any>) => {
    this._plugins.push(plugin)
    if (plugin.extendEditor) {
      plugin.extendEditor(this.editor, this)
    }
    if (plugin.RenderElement) {
      this._plugins_RenderElement.push(plugin.RenderElement)
    }
    if (plugin.RenderLeaf) {
      this._plugins_RenderLeaf.push(plugin.RenderLeaf)
    }
  }

  RenderElement = (props: SlatePenRenderElementProps<SlateElement>) => {
    const Element = this._plugins_RenderElement.find((r) => {
      return r(props)
    })
    if (Element) {
      return createElement(Element, props)
    }
    console.warn("INVALID ELEMENT", props)
    return createElement("p", null, "INVALID ELEMENT")
  }

  RenderLeaf = (props: RenderLeafProps): JSX.Element => {
    let found
    this._plugins_RenderLeaf.some((renderLeaf) => {
      const leaf = renderLeaf(props)
      if (leaf) {
        found = leaf
        return true
      }
      return false
    })
    if (found) {
      return found
    }
    return createElement("span", props.attributes, props.children)
  }
}
