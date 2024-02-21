import { z } from 'zod'

const AuthSchema = z
  .object({
    csrfToken: z.string({ required_error: 'csrfToken.required' }),
    identityToken: z.string({ required_error: 'identityToken.required' })
  })
  .strict()

export type TAuthInput = z.infer<typeof AuthSchema>

export default AuthSchema
