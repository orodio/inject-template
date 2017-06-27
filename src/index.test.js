import { inject } from './index'

test('inject', () => {
  const str = inject`
    Hello ${ d => d.user.name } the ${ d => d.user.job }.
    How is your ${ d => d.pet.type } named ${ d => d.pet.name }?
    This is a random string ${ "injection!!!" }.
  `

  const data = {
    user: {
      name: 'bob',
      job: 'builder',
    },
    pet: {
      name: 'Pilchard',
      type: 'cat',
    }
  }

  expect(str(data)).toMatchSnapshot()
})
