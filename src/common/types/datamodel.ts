import { ETool } from '@common/constants/tools'

import type { TAnnotation } from './annotation'

export type User = {
  id: TID
  email: string
  firstName: string
  lastName: string
  institution?: string
  position?: string
}

export type Project = {
  id: TID

  name: string
  description?: string

  User?: User

  Images?: Image[]

  createdAt: string
  updatedAt: string
}

export type ImageMetadata = {
  id: TID

  path: string
  hash: string
  directory: string
  filename: string
  extension: string
  format: string

  Image?: Image

  createdAt: string
  updatedAt: string
}

export type Image = {
  id: TID

  name: string
  description?: string

  Metadata: ImageMetadata

  User?: User
  Project?: Project
  Classes?: Class[]

  createdAt: string
  updatedAt: string
}

export type DefaultClass = {
  id: TID

  name: string
  description?: string
  color: string

  Classes?: Class[]

  createdAt: string
  updatedAt: string
}

export type Class = {
  id: TID

  name: string
  description?: string
  color: string

  Image?: Image
  Default?: DefaultClass

  createdAt: string
  updatedAt: string
}

export type Annotation = {
  id: TID

  raw: TAnnotation
  geometry: string

  type: ETool

  name: string
  description?: string

  locked: boolean
  visible: boolean

  Image: Image
  Class?: Class

  createdAt: string
  updatedAt: string
}
