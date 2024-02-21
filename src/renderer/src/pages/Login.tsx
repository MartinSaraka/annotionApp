import { memo, useCallback, useEffect, useState } from 'react'
import { Field, Form, Formik, FormikConfig } from 'formik'
import { useMutation } from '@apollo/client'

import { Box, Button, Icon, Input, Text } from '@renderer/ui'
import { type User } from '@common/types/datamodel'
import { useAuthStore } from '@renderer/store'

import { AUTH, LOGIN, TAuthData, TLoginData } from '@renderer/apollo/mutations'
import validationSchema, { type TLoginInput } from '@renderer/schemas/login'
import authSchema, { type TAuthInput } from '@renderer/schemas/auth'

import logo from '../../../../resources/logo-dark.svg'

const initialValues: FormikConfig<TLoginInput>['initialValues'] = {
  email: ''
}

const Login = () => {
  const authenticate = useAuthStore((state) => state.authenticate)

  const [requestingUser, setRequestingUser] = useState<User | null>(null)

  const [login, { loading: loginLoading }] = useMutation<
    { login: TLoginData },
    TLoginInput
  >(LOGIN)

  const [auth] = useMutation<{ auth: TAuthData }, TAuthInput>(AUTH)

  const onSubmit: FormikConfig<TLoginInput>['onSubmit'] = useCallback(
    (variables) => {
      login({ variables })
        .then(({ data }) => {
          if (!data) throw new Error('NO_DATA')
          // Set csrf token to electron store
          window.api.setCsrfToken({ csrfToken: data.login.csrfToken })
          // Set requesting user to local state
          setRequestingUser(data.login.User)
        })
        .catch((err) => {
          // TODO: handle error
          console.error(err)
        })
    },
    [login, setRequestingUser]
  )

  const handleAuth = useCallback(
    (variables: TAuthInput) => {
      try {
        authSchema.parse(variables)
      } catch (err) {
        console.error(err)
      }

      auth({ variables })
        .then(({ data }) => {
          if (!data) throw new Error('NO_DATA')
          // Set access token to electron store
          window.api.setAccessToken({ accessToken: data.auth.accessToken })
          // Set user to zustand store
          authenticate(data.auth.User)
        })
        .catch((err) => {
          // TODO: handle error
          console.error(err)
        })
    },
    [auth]
  )

  useEffect(() => {
    window.api.onIdentityToken((_event, params) => handleAuth(params))
  }, [handleAuth])

  return (
    <Box
      css={{
        _appRegion: 'no-drag',
        height: '100%',
        backgroundColor: '$dark1',
        borderTopWidth: '$1',
        borderTopStyle: '$solid',
        borderTopColor: '$dark3'
      }}
    >
      <Box
        css={{
          flex: 1,
          flexDirection: 'row'
        }}
      >
        <Box css={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {requestingUser ? (
            <Box>
              {requestingUser.firstName} {requestingUser.lastName}
            </Box>
          ) : (
            <Box css={{ maxWidth: 400, width: '100%', gap: '$1' }}>
              <Text variant="xl" css={{ fontWeight: 700 }}>
                Welcome back!
              </Text>

              <Text css={{ color: '$dark4', marginBottom: '$4' }}>
                Enter your email below, and we will send you a magic link for
                instant access.
              </Text>

              <Formik<TLoginInput>
                validateOnChange
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                initialValues={initialValues}
              >
                {({ values }) => (
                  <Box as={Form} css={{ gap: '$2', flexDirection: 'row' }}>
                    <Input size="giant" css={{ flex: 1 }}>
                      <Field
                        as={Input.Field}
                        required
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        disabled={loginLoading}
                      />
                    </Input>

                    <Button
                      type="submit"
                      disabled={!values.email || loginLoading}
                      loading={loginLoading}
                      css={{ minWidth: 51 }}
                    >
                      <Icon name="PaperPlaneIcon" width={16} height={16} />
                    </Button>
                  </Box>
                )}
              </Formik>
            </Box>
          )}
        </Box>

        <Box
          css={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box as="img" src={logo} height={50} alt="AnnotAid Logo" />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(Login)
