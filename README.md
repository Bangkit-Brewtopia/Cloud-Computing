# Cloud-Computing

## Authentication And User-related API ✔️
### Tech: Firebase Authentication, Firestore, Node JS, Express JS
#### List of endpoints:
| Endpoint     | Request Body      | Method     | Purpose |
| ------------- | ------------- | -------- | -------- |
| api/user/signup          | email, password, name         | Post  | Create new credentail for a user |
| api/user/signin            | email, password        | Post  | Starting a session based on user credential |
| api/user/logout          | -         | Post  | Stop the user session |
| api/user/edit-profile            | name, password        | Put  | Update user's name and password |
| api/user/upload-profile-picture            | image        | Post  | Upload image for profile picture by passing the image URL |

#### How to run:
* Clone this repository 
```sh
https://github.com/Bangkit-Brewtopia/Cloud-Computing.git
```
* Move to the project directory
```sh
cd Cloud-Computing
```
* Install the dependencies
```sh
npm i
```
* Run the server locally
```sh
npm run start
```
* The server will run on ``` localhost:5000 ``` and you can test the endpoints

## Article-related API ✔️
### Tech: Firestore, Node JS, Express JS
#### List of endpoints:
| Endpoint     | Request Body      | Method     | Purpose |
| ------------- | ------------- | -------- | -------- |
| api/article/          | -         | Get  | Get all of the articles |
| api/article/:id            | -        | Get  | Get article based on ID |

#### How to run:
* Clone this repository 
```sh
https://github.com/Bangkit-Brewtopia/Cloud-Computing.git
```
* Move to the project directory
```sh
cd Cloud-Computing
```
* Install the dependencies
```sh
npm i
```
* Run the server locally
```sh
npm run start
```
* The server will run on ``` localhost:5000 ``` and you can test the endpoints

## Model Deployment ✔️
Model used: model_keras_4.h5
<br>
<br>
The model is accessible via ```https://predict-zwqpt72g4a-et.a.run.app/predict``` with an image file (binary) as the request body. It is deployed using Google Cloud Run.
<br>
<br>
Tech: Python, FastAPI
<br>
#### How to run:
* Clone this repository 
``` https://github.com/Bangkit-Brewtopia/Cloud-Computing.git ```
* Move to model-deployment directory
``` cd ./model-deployment ```
* Install all the requirements
```pip install -r requirements.txt```
* Run on local server
``` uvicorn main:app --reload ```
* Open browser, and navigate to ``` localhost:8000/docs ``` to test endpoint with SwaggerUI 

## Chatbot ✔️
### [!IMPORTANT] There are two options:
### Chatbot API
Tech: FastAPI, Python, chatbot_model_4.h5
<br>
Mechanism: Send POST request to endpoint
| Endpoint | Request Body | Method | Purpose |
| -------- | ------------ | ------ | ------- |
| /        | -            | GET    | Root    |
| /        | { "input": user sentence input } | POST | Send user input to chatbot api |

<br> 
Deployed on cloud run ```https://chatbot-api-zwqpt72g4a-et.a.run.app/```
![image](https://github.com/Bangkit-Brewtopia/Cloud-Computing/assets/94887358/84cc2809-d233-4681-aa05-beccd5bddb8e)


### Chatbot using DialogFlow
Pros: 
+ training phrases
+ Built in interface, don't need to create interface from scratch. Just embed it on the app
Webhook deployed on vercel ```https://webhook-df-ayq8.vercel.app```
<br>
[Test agent here](https://dialogflow.cloud.google.com/#/agent/brewtopia-agent-ejwx/fulfillment)
<br>
![image]





