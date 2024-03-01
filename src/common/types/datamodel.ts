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

  Metadata?: ImageMetadata

  User?: User
  Project?: Project

  createdAt: string
  updatedAt: string
}
