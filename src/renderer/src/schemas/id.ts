import { z } from 'zod'

const IdSchema = z
  .object({
    id: z.string({ required_error: 'id.required' }).cuid('id.format')
  })
  .strict()

export type TIdInput = z.infer<typeof IdSchema>

export default IdSchema
