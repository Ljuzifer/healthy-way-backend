-------------------------------------------------
## BASE_URL: https://healthy-way-app.onrender.com
-------------------------------------------------

AUTH:
*************************************************

POST  ####/api/auth/registration - реєстрація 
req.body: 
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

POST  ####/api/auth/login - логін
req.body: 
{
    "email": "Ljuzifer@gmail.com",
    "password": "123456"
}

POST  ####/api/auth/logout - логаут
headers.authorization: Bearer accessToken

POST  ####/api/auth/refresh - оновити токени
req.body: 
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODIzY2NhYWUwNjhiMTQwMTZkNTI2MyIsIm5hbWUiOiJManV6aWZlciIsImlhdCI6MTcwMzAzNDE0MywiZXhwIjoxNzA0MTU3MzQzfQ.One4kXthbjqcQpOC5VlZuYxXU9tU7_-WFEqSwCTwd8o" //приклад//
}

POST  ####/api/auth/forgot-password - відновлення паролю
req.body: 
{
    "email": "Ljuzifer@gmail.com"
}

PUT  ####/api/auth/change-password - зміна паролю
headers.authorization: Bearer accessToken
req.body: 
{
    "email": "Ljuzifer@gmail.com",
    "password": "123456",
    "newPassword": "654321"
}

DELETE  ####/api/auth/delete - видалення юзера
headers.authorization: Bearer accessToken
req.body: 
{
    "email": "Ljuzifer@gmail.com",
    "password": "123456"
}

USER:
************************************************

GET  ####/api/user/current - інфа по юзеру
headers.authorization: Bearer accessToken

PUT  ####/api/user/update - оновити інфу
headers.authorization: Bearer accessToken
req.body:
{
    "name": "Dimon",
    "gender": "Male",
    "age": 37,
    "height": 188,
    "activityRatio": 1.9
} - all not required

POST  PUT  ####/api/user/load-avatar - завантажити аватар
headers.authorization: Bearer accessToken
form-data: "avatar" (На cloudinary наразі фото обробляється і переводиться в .png ** якщо будуть проблеми - змінимо)


RECOMMENDED:
********************************************************

GET  ####/api/user/recommended-food - рекомендовані продукти
headers.authorization: Bearer accessToken


FOOD (Diary):
********************************************************

GET  ####/api/user/food - отримати спожиту за сьогодні іжу
headers.authorization: Bearer accessToken

POST  ####/api/user/food - додати іжу
headers.authorization: Bearer accessToken
req.body: 
{
    "diary": "Breakfast",
    "name": "ukrainian borshch",
    "carbohydrate": 50,
    "protein": 40,
    "fat": 20,
    "calories": 666
}

PUT  ####/api/user/food/:foodId **приклад**657f725654a5a8a137879071** - оновити їжу
headers.authorization: Bearer accessToken
req.body: **all not required**
{
    "diary": "Breakfast",
    "name": "ukrainian borshch",
    "carbohydrate": 50,
    "protein": 40,
    "fat": 20,
    "calories": 666
}

DELETE  ####/api/user/food/:foodId **приклад**657f725654a5a8a137879071** - видалити іжу
headers.authorization: Bearer accessToken


GOAL:
************************************************************

PUT ####/api/user/goal - змінити ціль
headers.authorization: Bearer accessToken
req.body:
{
    "goal": "Gain muscle"
}


WEIGHT:
************************************************************

PUT ####/api/user/weight - змінити ціль
headers.authorization: Bearer accessToken
req.body:
{
    "weight": 88
}


WATER:
************************************************************

GET ####/api/user/water - витягти рівень випитої води
headers.authorization: Bearer accessToken

PUT ####/api/user/water - оновити рівень випитої води
headers.authorization: Bearer accessToken
req.body:
{
    "water": 400
}

DELETE ####/api/user/water - обнулити рівень випитої води
headers.authorization: Bearer accessToken


STATISTICS:
************************************************************

GET ####/api/user/statistics... - витягти рівень випитої води
headers.authorization: Bearer accessToken
req.params:
?period=today - за поточний день
?period=year - за рік
?period=month&month=05<номер конкретного місяця в форматі від 01 до 12> - за конкретний місяць
?period=month&quantity=5<кількість місяців> - за конкретну кількість останніх місяців