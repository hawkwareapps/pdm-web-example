# PDM Web Example
This is an example front-end website that utilizes the SOLIDWORKS PDM REST API.  To use this example, you must first install and configure the PDM REST API by [Hawk Ridge Systems](https://hawkridgesys.com).  Evaluation periods are available.


### SOLIDWORKS Solution Partner
![alt-text](https://www.solidworks.com/sw/images/content/SolidWorks_Logotype_CMYK_Red.bmp "SolidWorks Partner")

## Features
- Vue + Vue Router + Vuex + Axios.
- Material Design Style - [Vuetify](https://vuetifyjs.com/)
- PDM User Authentication.
- Retrieve PNG previews of SOLDIWORKS files.
- Example vault search capabilities.

## Getting started

1. `git clone https://github.com/hawkwareapps/pdm-web-example.git`
1. `npm install`
1. `npm run serve`

Make sure the request URL's to the REST API point to the correct endpoints.

``` js
// _services/Api.js

import axios from 'axios';
import { authHeader } from '../_helpers';

export default() => {
  return axios.create({
    baseURL: `http://localhost:9000/TestVault/Demo/api`,
    headers: authHeader(),
  });
};

```

## Screenshots
||
|-|
|![1.png](screenshots/1.png)|
|![2.png](screenshots/2.png)|
|![3.png](screenshots/3.png)|

## Authentication

```js
// _services/authentication.service.js

import axios from 'axios';

export const authenticationService = {
  login,
  logout
};

function login(username, password) {
  return axios.create({
    baseURL: `http://localhost:9000/TestVault/Demo/api`,
    headers: { 'Content-Type': 'application/json' }
  }).post('Token', JSON.stringify({ username, password })).then(r => {
    if(r){
      localStorage.setItem('token', r.data);
      localStorage.setItem('username', username);
      return {
        username: username,
        token: r.data
      };
    }
  });
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
}

```

### Searching

```js
// _services/search.service.js

import Api from './Api'

export const searchService = {
  search
};

function search(text) {
  return Api().post('Files/Search',{
    Recursive: true,
    StartFolderId: 1,
    SearchCriteria: [
      {
        SearchMethod: "And",
        Variables: [
          {
            Name: "Number",
            Value: text,
            Operator: "EdmVarOp_StringContains"
          }
        ]
      }
    ]
  })
  .then(result => result.data);
}
```