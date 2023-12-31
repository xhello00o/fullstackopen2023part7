import { useField } from '../hooks'
const CreateNew = (props) => {
    const content = useField('text')
    const author  = useField('text')
    const info = useField('text')

  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
    }

    const handleReset = (e) => {
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            content
            <input name='content' {...content.input} />
          </div>
          <div>
            author
            <input name='author' {...author.input}/>
          </div>
          <div>
            url for more info
            <input name='info' {...info.input} />
          </div>
          <button type='submit'>create</button>
          <button type='reset'>reset</button>
        </form>

      </div>
    )
  
  }

  export default CreateNew