import { z } from 'zod'

const CreateImageSchema = z
  .object({
    name: z.string({ required_error: 'name.required' }).trim(),
    description: z.string().trim().optional(),
    metadata: z.object({
      path: z.string({ required_error: 'metadata.path.required' }),
      hash: z.string({ required_error: 'metadata.hash.required' }),
      directory: z.string({ required_error: 'metadata.directory.required' }),
      filename: z.string({ required_error: 'metadata.filename.required' }),
      extension: z.string({ required_error: 'metadata.extension.required' }),
      format: z.string({ required_error: 'metadata.format.required' })
    }),
    projectId: z.string().cuid('projectId.format').optional()
  })
  .strict()

export type TCreateImageInput = {
  data: z.infer<typeof CreateImageSchema>
}

export default CreateImageSchema
