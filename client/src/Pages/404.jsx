import { Button } from 'bootstrap-react'
import { Link } from 'react-router-dom'

function error404() {
  return (
    <div>
      <h1>The Page Does Not Exist (404)</h1>
      <Button variant="contained" color="primary" as={Link} >

        </ Button>
    </div>
  )
}

export default error404