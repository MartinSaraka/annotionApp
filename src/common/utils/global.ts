import React from 'react'

export const getSelectedOrFirst = <
  TObject extends Record<PropertyKey, TObject[keyof TObject]>
>(
  obj: TObject,
  select: keyof TObject | null
): TObject[keyof TObject] | undefined => {
  if (select && select in obj) {
    return obj[select]
  }

  return Object.values(obj)?.[0]
}

export const preventDefault = <TEvent extends React.MouseEvent>(e: TEvent) => {
  e.preventDefault()
}

export const setGlobalCssVariable = <T>(name: string, value: T) => {
  document.documentElement.style.setProperty(name, `${value}`)
}

export const setHtmlElementAttribute = <TElement extends HTMLElement, TValue>(
  name: string,
  value: TValue,
  element: TElement = document.documentElement as TElement
) => {
  element.setAttribute(name, `${value}`)
}

export const onNextTick = <T extends () => void>(callback: T) => {
  setTimeout(callback, 0)
}

type EventFunction<T extends React.SyntheticEvent> = (event: T) => void

export const preventAllDefaults = <TEvent extends React.SyntheticEvent>(
  callback: EventFunction<TEvent>
): EventFunction<TEvent> => {
  return (event: TEvent) => {
    event.preventDefault()
    event.stopPropagation()
    callback(event)
  }
}

export const elseUndefined = <TCondition, TValue>(
  condition: TCondition,
  value: TValue
): TValue | undefined => (condition ? value : undefined)

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export const arrayToObject = <
  TType extends PropertyKey,
  TArray extends Array<TType>,
  TKey extends PropertyKey
>(
  arr: TArray,
  keys: Readonly<TKey[]>
) => {
  const obj = {} as Record<TKey, TType>

  for (let i = 0, j = 0; i < arr.length; i++) {
    if (!arr[i]) continue
    if (!keys[j]) break
    obj[keys[j++]] = arr[i]
  }

  return obj
}
