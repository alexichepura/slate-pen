import { Editor, Text, Element as SlateElement } from "slate"
import { RenderElementProps as SlateRenderElementProps, RenderLeafProps } from "slate-react"
import { SlatePen } from "./pen"

export type SlatePenRenderElementProps<T = Element> = {
  children: any
  element: T
} & SlateRenderElementProps

export type TRenderElement<T = SlateElement> = (
  props: SlatePenRenderElementProps<T>
) => JSX.Element | null
export type TRenderLeaf = (props: RenderLeafProps) => JSX.Element | null
export type TExtendEditor = (editor: Editor, slatePen: SlatePen) => void

export type TPartialNode = Partial<Editor> | Partial<Element> | Partial<Text>
export type TSlateTypeElement = {
  type: string
  children?: TPartialNode[]
  // [key: string]: any
}

export type TToHtml<T extends TPartialNode = TPartialNode> = (
  element: T,
  slatePen: SlatePen
) => string | null
export type TFromHtml = (htmlString: string) => (TSlateTypeElement | TPartialNode)[]
export type TFromHtmlElement<T = TSlateTypeElement> = (
  htmlElement: HTMLElement,
  slatePen: SlatePen
) => T | Text[] | null

export type TSlatePlugin<T = TPartialNode> = {
  toHtml?: TToHtml<T>
  fromHtmlElement?: TFromHtmlElement<T>
  extendEditor?: TExtendEditor
  RenderElement?: TRenderElement<T>
  RenderLeaf?: TRenderLeaf
}

export const isSlateTypeElement = (el: any): el is TSlateTypeElement => {
  return el && typeof el.type === "string"
}
