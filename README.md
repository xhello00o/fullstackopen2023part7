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
## Webpack
### Bundling
As every component/ module is divided into their own files, bundling is required to combine all these files into one ```index.html``` in the root for the browser to run. This is normally the ```npm run build``` step either using ```webpack``` or ```vite```. An exmaple of the config file can be seen below, it can be a function or an object ```config = { ...} ```. 

```javascript
const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    }
  }
}

module.exports = config
```
### Loaders
When we use react, it uses JSX which the webpack is unable to bundle it directly and therefore a **loader** is required to process the react code before bundling. A loader such as ```babel-loader``` can be used.
A module property is also added into the config.
```
npm install @babel/core babel-loader @babel/preset-react --save-dev
```
```javascript
output:{...}, 
module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
```
if ```async/await``` is used, certain browsers might not be able to render it and therefore additional packages, ```core-js``` and ```regenerator-runtime``` must be install and imported into the index.js file (entry point)

```
npm install core-js regenerator-runtime
```
```javascript
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
```

### Transpilers
As some browers are not able to run the latest ES6 and ES7 features for javascript, they are usually transpiled (converted) into ES5 standard which is widely used. The transpilation process is being executed by ```babel``` through a preset plugin ```@babel/preset-env```. These [presets](https://babeljs.io/docs/plugins/) are pre-configured and ready-made to use. These presets then can be added to the module property under the rules and then options > presets.

```
npm install @babel/preset-env --save-dev
```
### CSS
In order to load CSS styles, a CSS loader and style loader is required such as ```css-loader``` and ```style-loader``` respectively. The job of the css loader is to load the CSS files and the job of the style loader is to generate and inject a style element that contains all of the styles of the application. With this we dont have to import the CSS into the ```index.html``` file as it is already included in the ```main.js``` file (post Bundling). Additional modifications to the config file is also required.

```node
npm install style-loader css-loader --save-dev
```
```javascript
module: {
  rules: [
    { ... },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ],
}
```
### Webpack-dev-server
In order for faster development work and not having to bundle(build) and refresh the browser everytime a new change to the code is made, we can use [```webpack-dev-server```](https://webpack.js.org/guides/development/#using-webpack-dev-server). To run this, we need to make changes to the scripts in package.json and the webpack.config.js file.

```
npm install --save-dev webpack-dev-server
```

```javascript
const config = {
  //...
  output: {//... },
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
   module:{//...}
  // ...
};
```
```javascript
{
  // ...
  "scripts": {
    "build": "webpack --mode=development",

    "start": "webpack serve --mode=development"
  },
  // ...
}
```
### Source maps
due to the bundling, the code structure changed and therefore the error that are thrown will not correspond to the same lines in the code. Therefore, a [source-map](https://webpack.js.org/configuration/devtool/) is required. Changes to the ```webpack.config.js``` file is needed.

```javascript

  output: {
    // ...
  },
  devServer: {
    // ...
  },
  devtool: 'source-map',
  // ..
};
```
### Minifying the code
When bundling, all the code that are imported will be included such as the entire library of ```react``` even though not everything is used. Therefore, the filesizes tend to be very large. Hence, one of the leading tools [```uglifyjs```](http://lisperator.net/uglifyjs/) can be used. With Version 4 of ```webpack```, no additonal packages is required to be download and only a simple change to the script in package.json is needed (Adding ```--mode=production```).
```javascript
{
  "scripts": {
    "build": "webpack --mode=production",
    //...
  },
```
### Development and Production configuration.
Webpack's configuration function has two parameters, env and argv. We can use the latter to find out the mode defined in the npm script. Since ```BACKEND_URL``` has been defined, it can be used globally in the code.
```javascript
const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv', argv.mode)
  const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

  return {
    //...
    module: {
      // ...
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}
```
### Polyfill
The IE browser do not support more advanced feature such as promises etc. Therefore polyfill such as ```promise-polyfill``` is required to enable IE browser compatibility. The following code has to be added to the application code index.js. One exhaustive list of existing polyfills can be found [here](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills).
The browser compatibility of different APIs can be checked by visiting https://caniuse.com or [Mozilla's website](https://developer.mozilla.org/en-US/).
```javascript
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}
```
