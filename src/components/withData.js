import * as React from 'react'

const {
  REACT_APP_API_URL
} = process.env

function withData(path, WrappedComponent) {
  return function withDataComponent(props) {
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const refresh = () => {
      setData(null)
      setError(null)
      setLoading(true)

      if (path) {
        fetch(REACT_APP_API_URL + path)
          .then(async (res) => {
            const status = res.status
            const contentType = res.headers.get('content-type')
            console.log(contentType)
            const isJson = contentType?.includes('application/json')
            const dat = isJson ? await res.json() : null
            if (status !== 200) {
              let err = `status: ${res.status}. ${dat?.message}`
              setError(err)
            } else if (!isJson) {
              setError(`response content-type header is ${contentType} not application/json`)
            } else {
              setData(dat)
            }
            setLoading(false)
          }).catch((err) => {
            setError(`Error ${err?.message}`)
            setLoading(false)
          })
      }
    }

    React.useEffect(() => {
      refresh()
    }, [])

    return (
      <WrappedComponent
        data={data}
        error={error}
        loading={loading}
        refresh={refresh}
        {...props}
      />
    )
  }
}

export default withData