# `@orodio/inject-template`

[![Build Status](https://travis-ci.org/orodio/gate.svg?branch=master)](https://travis-ci.org/orodio/inject-template)

### Install

```
yarn add @orodio/inject-template
```

### Use

```javascript
// ./graphql.js
import { inject } from '@orodio/inject-template'

export const graphQL = (...query) => (data={}) =>
  fetch(GRAPHQL_URL, {
    ...method(),
    ...headers(),
    body: JSON.stringify({
      query: inject(...query)(data) // -------- THIS BIT
    }),
  }).then(res => res.json())



// ./Counter.js

import { graphQL } from './graphql'

// -------------------------------------------- AND THIS BIT
const query = graphQL`
  query {
    counter(id: "${ d => d.id }") {
      title
      count
    }
  }
`

export class Counter extends React.Component {
  state = {
    loading: true,
    count: 0,
    title: "",
  }

  componentDidMount () {
    const { id } = this.props
    query({ id }) // -------------------------- ALSO THIS BIT
      .then(res => this.setState({
        loading:false,
        ...res.data.counter
      })
  }

  render () {
    const {
      loading,
      count,
      title
    } = this.state

    return loading
      ? <div>Loading...</div>
      : <div>{ title }: { count }</div>
  }
}
```
