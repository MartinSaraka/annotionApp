import { TAnnotationClass } from '@common/types/annotation'
import { hexToRgb } from '@common/utils/colors'

const STYLE_TAG_ID = 'annotation-classes'
const ROOT_REGEX = /:root\s*{([\s\S]*?)}/

class ClassHandler {
  private constructor() {
    throw new Error('`ClassHandler` should not be instantiated')
  }

  static initClasses = (classes: TAnnotationClass[]) => {
    const oldElement = document.getElementById(STYLE_TAG_ID)
    if (oldElement) oldElement.remove()

    const newElement = document.createElement('style')
    newElement.id = STYLE_TAG_ID

    const cssVariables = classes
      .map((c) => ClassHandler.getVariablesDefinition(c.id, c.name, c.color))
      .join('\n')

    const cssClasses = classes
      .map((c) => ClassHandler.getClassDefinition(c.id))
      .join('\n')

    newElement.textContent = `
      :root {
        ${cssVariables}
      }

      ${cssClasses}
    `

    document.head.appendChild(newElement)
  }

  static getClassRegex = (className: string) =>
    new RegExp(`${className}.*?}`, 'gi')
  static getVariableRegex = (variableName: string) =>
    new RegExp(`\\s*${variableName}\\s*:\\s*[^;]+;`)

  static getClassName = (id: TID) => `*[data-class-id="${id}"]`
  static getVariableName = (name: string, id: TID) => `--class-${id}-${name}`

  static getVariableColorValue = (...rgb: number[]) => rgb.join(', ')
  static getVariableNameValue = (name: string) => `'${name}'`

  static getClassDefinition = (id: TID) => `
    ${ClassHandler.getClassName(id)} {
      --class-color: var(--class-${id}-color);
      --class-name: var(--class-${id}-name);
    }
  `
  static getVariablesDefinition = (id: TID, name: string, color: string) => {
    const nameValue = name
    const rgb = hexToRgb(color)
    const colorValue = [rgb.r, rgb.g, rgb.b]

    return `
      ${ClassHandler.getVariableName(
        'color',
        id
      )}: ${ClassHandler.getVariableColorValue(...colorValue)};
      ${ClassHandler.getVariableName(
        'name',
        id
      )}: ${ClassHandler.getVariableNameValue(nameValue)};
    `
  }

  static getRootContent = (content: string) =>
    content.match(ROOT_REGEX)?.[1] || ''

  static upsertClass(data: TAnnotationClass) {
    const style = document.getElementById(STYLE_TAG_ID)
    if (!style) return

    let content = style.textContent || ':root {}'

    const name = data.name
    const rgb = hexToRgb(data.color)
    const color = [rgb.r, rgb.g, rgb.b]

    const className = ClassHandler.getClassName(data.id)
    const variableName = ClassHandler.getVariableName('name', data.id)
    const variableColor = ClassHandler.getVariableName('color', data.id)

    const variableNameValue = ClassHandler.getVariableNameValue(name)
    const variableColorValue = ClassHandler.getVariableColorValue(...color)

    const nameRegex = ClassHandler.getVariableRegex(variableName)
    const colorRegex = ClassHandler.getVariableRegex(variableColor)

    const nameVariable = ` ${variableName}: ${variableNameValue};`
    const colorVariable = ` ${variableColor}: ${variableColorValue};`

    const rootContentName = ClassHandler.getRootContent(content)

    // Name variable
    if (nameRegex.test(rootContentName)) {
      // If the variable exists, replace its value
      content = content.replace(nameRegex, nameVariable)
    } else {
      // If the variable doesn't exist, create it
      content = content.replace(
        ROOT_REGEX,
        `:root { ${rootContentName}\n ${nameVariable}\n}`
      )
    }

    const rootContentColor = ClassHandler.getRootContent(content)

    // Color variable
    if (colorRegex.test(rootContentColor)) {
      // If the variable exists, replace its value
      content = content.replace(colorRegex, colorVariable)
    } else {
      // If the variable doesn't exist, create it
      content = content.replace(
        ROOT_REGEX,
        `:root { ${rootContentColor}\n ${colorVariable}\n}`
      )
    }

    // Class definition
    if (!content.includes(className)) {
      // If the class definition doesn't exist, create it
      const classDefinition = ClassHandler.getClassDefinition(data.id)
      content += classDefinition
    }

    style.textContent = content
  }

  static deleteClass(data: TAnnotationClass) {
    const style = document.getElementById(STYLE_TAG_ID)
    if (!style) return

    let content = style.textContent || ':root {}'

    const variableName = ClassHandler.getVariableName('name', data.id)
    const variableColor = ClassHandler.getVariableName('color', data.id)

    const nameRegex = ClassHandler.getVariableRegex(variableName)
    const colorRegex = ClassHandler.getVariableRegex(variableColor)
    const classRegex = ClassHandler.getClassRegex(data.id)

    // Name variable
    content = content.replace(nameRegex, '')

    // Color variable
    content = content.replace(colorRegex, '')

    // Class definition
    content = content.replace(classRegex, '')

    style.textContent = content
  }
}

export default ClassHandler
