import { z } from 'zod'

const UpdateImageSchema = z
  .object({
    id: z.string({ required_error: 'id.required' }).cuid('id.format'),

    data: z
      .object({
        name: z.string().trim().optional(),
        description: z.string().trim().optional(),
        projectId: z.string().cuid().optional()
      })
      .strict()
  })
  .strict()

export type TUpdateImageInput = z.infer<typeof UpdateImageSchema>

export default UpdateImageSchema
