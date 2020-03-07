# Unofficial Slate.js Plugin ENgine

---

Custom plugin engine for [Slate](https://www.slatejs.org/) editors framework. Written in TypeScript.

## Why

Slate.js is a great framework for simple and complex text editors.
It is very customisable in a functional manner.
During development of an HTML WYSIWYG based on Slate.js we've seen an opportunity to standardize our modules.
So we started this library - an abstraction layer for Slate.js plugins.
It currently supports these methods:

- extendEditor
- RenderElement
- RenderLeaf
- toHtml
- fromHtmlElement

## Quick Example

```ts
export const createYourVoidElementPlugin = (): TSlatePlugin => ({
  extendEditor: editor => {
    const { isVoid } = editor
    editor.isVoid = element => {
      return isYourSlateElement(element) ? true : isVoid(element)
    }
  },
  RenderElement: props => {
    if (isYourSlateElement(props.element)) {
      return <YourComponent {...props.attributes} />
    }
    return null
  },
  toHtml: slateElement => {
    if (isYourSlateElement(slateElement)) {
      return formatVoidToString(slateElement.type, slateElement.attributes)
    }
    return null
  },
  fromHtmlElement: htmlElement => {
    if (isYourHtmlElement(htmlElement)) {
      return generateYourSlateElement(htmlElement)
    }
    return null
  },
})
```

## Related project and more examples

[slate-html-mui](https://github.com/palessit/slate-html-mui) - Slate and [Material-UI](https://material-ui.com/) based HTML WYSIWYG editor.

## Installation

```sh
npm install slate-pen
or
yarn add slate-pen
```

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
