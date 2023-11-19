# fullstackopen2023part7
## Course Content
The seventh part of the course touches on several different themes. First, we'll get familiar with React router. React router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS styles to React applications. During the entire course, we've used Vite to generate the body of our applications. It is also possible to configure the whole toolchain yourself, and in this part we will see how this can be done with a tool called Webpack. We shall also have a look at hook functions and how to define a custom hook.

### React Router ( Exercise 7.1 - 7.3 )
```react-router-dom``` is used for routing between pages. Its benefit is that it can route pages while also changing the URL. This allow for navigating between webpages through the URL without loading new content from the server as the route are done with javascript. An Anecdote list application was created with 4 pages; About page, Anecdotes List page, Single Anecdote Page and a Create Anecdote page. ```useMatch``` was used to match the url param id to and to retrieve a single anecdote before rendering, while ```useParams``` also work in the similar way however, ```useParams``` is only rendered after the component is rendered and therefore the anecdote is retrieved after the component is rendered. ```useNavigate``` hook or ```<Navigate>``` component both works in redirecting to a specific link.

The code for this section is in the [```main```](https://github.com/xhello00o/fullstackopen2023part7/tree/main/) branch.

### Custom Hooks ( Exercises 7.4 - 7.8 )
React allows use to create our own custom hooks. However there are some rules to abide by. These rules can be enforced using an ```eslint``` rule [```eslint-plugin-react-hook```](https://www.npmjs.com/package/eslint-plugin-react-hooks).
- The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining component.

For exercise 7.4 -7.6, it is a continuation of the previous exercises to build on the Anecdote List app. A custom ```useField``` hook was created to handle ```value, onChange ``` of the input within the hook.\
```javascript
const useField = (type)=> {
   const [value,setValue] = useState("")
   const onChange=(event)=>{
    setValue(event.target.value)
   }
   const reset = ()=>{
    setValue("")
   }
   return {
    input:{type,
    value,
    onChange},
    reset
   }
}
```

#### Exercise 7.7 Country Hook
This continues on from the exercises 2.18 to 2.20. New ```useCountry``` hook was created that takes in the name of country from the search input, which is handled by a seperate ```useState```. The ```useCountry``` hook then tries to call the API within the hook using a ```useEffect``` hook to control when the API would be triggered. The previous ```useField``` hook was used for the search bar.

```javascript
const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const baseUrl='https://studies.cs.helsinki.fi/restcountries/'
    useEffect(() => {
        if (name ==="" ){
            setCountry(null)
        }
        else{
            axios.get(`${baseUrl}/api/name/${name}`).then(res => {
                setCountry({...res.data,found:true})
                console.log(`${name} data loaded`,res)
            }).catch(err =>{
                if (err.response.statusText === 'Not Found'){
                    setCountry({found:false})
                }
            }
                )
        }
    }, [name])
  
    return country
  }
```

### Exercise 7.8 Ultimate Hook
A separate Notes app was made. A new ```useResources``` hook was created. It is used to take in a API URL and ```useEffect``` hook within to fetch the resources and save it to state. A separate create function was also created within the ```useResources``` hook to handle POST request for new resource creation.
```javascript
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(()=>{
        axios.get(baseUrl).then(res=> {
            console.log("fetched data",res.data)
            setResources(res.data)
        })
    },[baseUrl])
    
    const create = (resource) => {
        axios.post(baseUrl,resource).then(res => {
            console.log('post data',res.data)
            setResources(resources.concat(res.data))
        })
              
    }
    const service = {
      create
    }
    return [
      resources, service
    ]
  }
```

## More about Styles
These 2 styles are used to make 2 separate designs of the same apps which will be covered in the final section. More different styles can be found [here](
- Google MaterialUI
  ```node
  npm install @mui/material @emotion/react @emotion/styled
  ```
- React-bootstrap (requires a link for loading the CSS stylesheet for Bootstrap inside of the head tag in the public/index.html file of the application)
  ```node
  npm install react-bootstrap
  ```
  ```javascript
  <head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous"
  />
  // ...
  </head>
  ```
