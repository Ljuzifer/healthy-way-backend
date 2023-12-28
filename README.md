<h1 align="center" style="color: #2222ec; font-family: Roboto Mono,Consolas,Liberation Mono,Courier New,Courier,monospace;
    font-size: 55px;
    font-weight: 700;">
HEALTY WAY APP <p style="color: yellow">backend</p> <img src="./public/icons/icons8-code-64.png" />
</h1>

<div align="center" color="#694e04" style="color: #694e04; font-family: Roboto Mono,Consolas,Liberation Mono,Courier New,Courier,monospace;
    font-size: 22px;
    font-weight: 500;">
Welcome to the Healthy Way App DARK SIDE!
</div>

---

<div align="center">
<img src="./public/icons/windows.svg" width="220"/>
</div>

<div align="center" style="margin-left: auto; margin-right: auto; width: fit-content;">
<a><img src="./public/icons/icons8-js.svg" width="50"/></a>
<a><img src="./public/icons/nodejs.svg" width="50"/></a>
<a><img src="./public/icons/express-js.svg" width="50"/></a>
<a><img src="./public/icons/mongodb.svg" width="50"/></a>
<a><img src="./public/icons/mongoose-logo.svg" width="50"/></a>
<a><img src="./public/icons/swagger.svg" width="50"/></a>
<a><img src="./public/icons/json-web-token.svg" width="50"/></a>
<a><img src="./public/icons/gravatar.png" width="50"/></a>
<a><img src="./public/icons/nodemailer.png" width="50"/></a>
<a><img src="./public/icons/cloudinary-2.svg" width="50"/></a>
<a><img src="./public/icons/postman.svg" width="50"/></a>
</div>

---

<div align="center">
<h3>BASE Render URL: <a href="https://healthy-way-app.onrender.com" target="_blank" rel="noreferrer noopener">https://healthy-way-app.onrender.com</a></h3>
</div>

---

<div align="center">
<a href="https://healthy-way-app.onrender.com/api-skeleton" target="_blank" rel="noreferrer noopener">
<b>SWAGGER API Documentations</b>
</a>
</div>

---

---

<h2 style="color: #22b5bf; font-family: Roboto Mono,Consolas,Liberation Mono,Courier New,Courier,monospace;
    font-size: 22px;
    font-weight: 500;">Getting Started</h2>

To get started with the project, follow these steps:

1. Clone this repository to your local machine:

`git clone` [tap!](https://github.com/Ljuzifer/healthy-way-backend.git)

2. Change directory to the project folder:

`cd healthy-way-backend`

3.  Install the project dependencies:

`npm install`

4. Start the development server:

`npm run start:dev`

5. Server will start on the `http://localhost:3000` or `BASE Render URL` to access the application.

---

<h2 style="color: #22b5bf; font-family: Roboto Mono,Consolas,Liberation Mono,Courier New,Courier,monospace;
    font-size: 22px;
    font-weight: 500;">ROUTES Description:</h2>

### AUTH:

---

### POST ####/api/auth/registration - `new user's registration`

#### req.body:

```
{
    "name": "Ljuzifer",
    "email": "Ljuzifer@gmail.com",
    "password": "123456",
    "goal": "Gain muscle",
    "gender": "Male",
    "age": 37,
    "height": 188,
    "weight": 100,
    "activityRatio": 1.55
}
```

### POST ####/api/auth/verify - `verify new user's email if verification letter doesn't came`

#### req.body:

```
{
    "email": "email@email.com" - `real email that was registrated`
}
```

### POST ####/api/auth/login - `user's login`

#### req.body:

```
{
    "email": "Ljuzifer@gmail.com",
    "password": "123456"
}
```

### POST ####/api/auth/logout - `user's logout`

#### headers.authorization: _Bearer accessToken_

### POST ####/api/auth/refresh - `update access & refresh tokens`

#### req.body:

```
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODIzY2NhYWUwNjhiMTQwMTZkNTI2MyIsIm5hbWUiOiJManV6aWZlciIsImlhdCI6MTcwMzAzNDE0MywiZXhwIjoxNzA0MTU3MzQzfQ.One4kXthbjqcQpOC5VlZuYxXU9tU7_-WFEqSwCTwd8o"
}
```

### POST ####/api/auth/forgot-password - `regenerate user's new password`

#### req.body:

```
{
    "email": "Ljuzifer@gmail.com"
}
```

### PUT ####/api/auth/change-password - `change user's password`

#### headers.authorization: _Bearer accessToken_

#### req.body:

```
{
    "email": "Ljuzifer@gmail.com",
    "password": "123456",
    "newPassword": "654321"
}
```

### DELETE ####/api/auth/delete/:password - `deleting user's account`

#### headers.authorization: _Bearer accessToken_

---

### USER:

---

### GET ####/api/user/current - `get user's current information`

#### headers.authorization: _Bearer accessToken_

### PUT ####/api/user/update - `update user's information`

#### headers.authorization: _Bearer accessToken_

#### req.body:

```
{
    "name": "Dimon",
    "gender": "Male",
    "age": 37,
    "weight": 108,
    "height": 188,
    "activityRatio": 1.9
} - all not required
```

### POST ####/api/user/load-avatar - `upload user's avatar`

#### headers.authorization: _Bearer accessToken_

#### form-data: "avatar"

`(At cloudinary, the photo is currently being processed and converted to .png)`

---

### RECOMMENDED:

---

### GET ####/api/user/recommended-food - `get the recommended food`

#### headers.authorization: _Bearer accessToken_

---

### FOOD (Diary):

---

#### GET ####/api/user/food - `get user's diary food`

#### headers.authorization: _Bearer accessToken_

### POST ####/api/user/food - `add user's diary food`

#### headers.authorization: _Bearer accessToken_

#### req.body:

```
{
    "diary": "Breakfast",
    "name": "ukrainian borshch",
    "carbohydrate": 50,
    "protein": 40,
    "fat": 20,
    "calories": 666
}
```

### PUT ####/api/user/food/:foodId _example_ **657f725654a5a8a137879071** - `update diary's food`

#### headers.authorization: _Bearer accessToken_

#### req.body: **all not required**

```
{
    "diary": "Breakfast",
    "name": "ukrainian borshch",
    "carbohydrate": 50,
    "protein": 40,
    "fat": 20,
    "calories": 666
}
```

### DELETE ####/api/user/food/:foodId _example_ **657f725654a5a8a137879071** - `delete diary's food`

#### headers.authorization: _Bearer accessToken_

---

### GOAL:

---

### PUT ####/api/user/goal - `change user's goal`

#### headers.authorization: _Bearer accessToken_

#### req.body:

```
{
    "goal": "Gain muscle"
}
```

---

### WEIGHT:

---

### PUT ####/api/user/weight - `change user's weight`

#### headers.authorization: _Bearer accessToken_

#### req.body:

```
{
    "weight": 88
}
```

---

### WATER:

---

### GET ####/api/user/water - `get user's water level`

#### headers.authorization: _Bearer accessToken_

### PUT ####/api/user/water - `update user's water level`

#### headers.authorization: _Bearer accessToken_

#### req.body:

```
{
    "water": 400
}
```

### DELETE ####/api/user/water - `reset water level`

#### headers.authorization: _Bearer accessToken_

---

### STATISTICS:

---

### GET ####/api/user/statistics... - `statistics for specific periods`

#### headers.authorization: _Bearer accessToken_

#### req.params:

##### _?period=today_ - `for the current day`

##### _?period=year_ - `for the current year`

##### _?period=month&month=05_ - `the number of a specific month in the format from 01 to 12 - for the specific month`

##### _?period=month&quantity=5_ - `quantity of months - for a specific number of recent months`

---

<div align="center">
  <img src="https://media4.giphy.com/media/6wDZlsdqvMweQaNY2w/giphy.gif?cid=ecf05e47mkur64xx7xsm444af0s4xi1yxegcc0k76oc57j7v&ep=v1_gifs_search&rid=giphy.gif&ct=g" width="180"/>
</div>

<div align="center">
  <h4>Created by &copy; Ljuzifer</h4>
  <a href="https://www.linkedin.com/in/ljuzifer/" target="_blank" rel="noopener norefferer">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
</div>
