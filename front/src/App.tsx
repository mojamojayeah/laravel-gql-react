import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useCreateUserMutation, useListUserQuery } from './generate/generated'

const App = () => {
  const [name, setName] = useState<string>('')
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    },
    [],
  )
  const [passwd, setPasswd] = useState<string>('')
  const handlePaawdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswd(e.target.value)
    },
    [],
  )
  const [email, setEmail] = useState<string>('')
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    [],
  )
  const queryClient = useQueryClient()
  // const { status, data, error, isFetching } = useUser() //下と同じ
  const { data: listUsers } = useListUserQuery() //refetchもらえる
  const { data: createUsers, mutate } = useCreateUserMutation({
    onSuccess: async () => {
      // refetch() //強制で行う
      // await queryClient.refetchQueries(['listUser']) //上と同じ
      await queryClient.invalidateQueries(['listUser']) //queryしてたらrefetchしてなきゃ、後回し
    },
  })

  const createUser = useCallback(() => {
    mutate({
      email: email,
      name: name,
      password: passwd,
    })
  }, [email, mutate, name, passwd])

  return (
    <div>
      <div className="flex space-x-4">
        <div>
          <span>name</span>

          <input
            className="border-2 border-black"
            onChange={handleNameChange}
            value={name}
          />
        </div>

        <div>
          <span>pass</span>

          <input
            className="border-2 border-black"
            onChange={handlePaawdChange}
            type="password"
            value={passwd}
          />
        </div>

        <div>
          <span>email</span>

          <input
            className="border-2 border-black"
            onChange={handleEmailChange}
            type="email"
            value={email}
          />
        </div>

        <button
          className="rounded-md bg-yellow-200 px-5"
          onClick={createUser}
          type="button"
        >
          作成
        </button>
      </div>

      <div className="mx-2 flex justify-between">
        <div>id</div>

        <div>email</div>

        <div>name</div>
      </div>

      {listUsers?.users?.data.map((user) => {
        return (
          <div className="mx-2 flex justify-between" key={user.id}>
            <div>{user.id}</div>

            <div>{user.email}</div>

            <div>{user.name}</div>
          </div>
        )
      })}

      <div className="mt-5 text-center">作成ユーザー</div>

      <div className="mx-2 flex justify-between">
        <div>{createUsers?.createUser?.id}</div>

        <div>{createUsers?.createUser?.email}</div>

        <div>{createUsers?.createUser?.name}</div>
      </div>
    </div>
  )
}

export default App
