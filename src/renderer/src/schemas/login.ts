import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const LoginSchema = z
  .object({
    email: z.string({ required_error: 'email.required' }).email('email.format')
  })
  .strict()

export type TLoginInput = z.infer<typeof LoginSchema>

export default toFormikValidationSchema(LoginSchema)
