# ✒️ Draw-Code
Like Leetcode.. but you can draw out the solution before you code and submit .

(Preview videos at the end)
## Why ?
I frequently draw out the solution before coding it - when doing dsa or developing. There was no existing tool for doing both inside one application. So I built Draw-Code.

## 🤖 Technologies :
- Typescript
- Javascript
- SQL
- Express (Node)
- React
- Postgresql
- Docker containers
- Jest
- Supertest
- Testcontainers
- Tailwindcss

## ✨ Features :
- **Drawboard** (Special Feature: Canvas vim)
  - Choose a Tool : You can use Rectangle, Circle, Line, Pencil (freehand) - Choose one tool and start drawing
  - Choose a color : You can choose from the Color palette - Red/Green/Blue/Yellow
  - Draw : Draw it out by clicking and dragging your Mouse. You can draw from within the canvas, go out of it and come back again without releasing the mouse to resume the drawing in the same flow.
  - Undo, Redo : Undo or Redo the changes
  - X : Clear the canvas
  - Canvas vim : Keep your Left hand on the keyboard to switch between the shapes on the go (fasttt) using Keyboard shortcuts. Right hand to draw using Mouse.
  
    <img width="538" height="48" alt="image" src="https://github.com/user-attachments/assets/2c7ea913-edf4-4e87-87c7-579cf9824daf" />

- **Drawboard resizer, Codespace resizer** : Resize the drawboard horizontally if you need more space for drawing. Resize the Result box in the Codespace vertically to view the Test case results without scrolling. Resize the Codespace horizontally to code with a wider view.
- **Coding space**
  - Code editor : Write your code - Submit - get the Result.
  - Code judge engines for each language : Containerized Coding judges with restricted resources for executing user submitted code. (Malicious code can't do anything to the host)
  - Result Box : Case results or Error messages are shown. You can find out the succeeded or failed test cases from here.
- **Signin with Google** : OAuth authentication of user.
- **Custom Jwt with Rotating Refresh token system** : Short lived Jwts for authenticating the user in subsequent requests after login. Long lived Refresh tokens for recreating the jwts when expired. Rotation of Refresh tokens for adding more security if hacker got hands on a valid Refresh token (rare but can't take the chance).
- **Administrator** : Add questions from the admin page (only for authorized people -> jwt body object's role=admin property)   

## 🔷 Process of development & learnings :
You can see (everything) the process from the start - demonstrations, bug encounters & fixes at [my X profile](https://x.com/r_amarthya_sc)

_**Note** : Everything is handcrafted (for learning purposes) - no AI code cut & paste involved, no Roughjs or other libraries for canvas involved. Likewise no Codemirror library involved for the code editor -> For making a lean software._

  

- **Drawboard** :
  1. Learnt about 2d Context, Relation between Device pixel ratio (DPR), Physical pixels, css pixels and canvas pixels - for improving pixel clarity, and syncing coordinates of canvas with css by scaling.
  2. Created pixel images for the shape buttons (Normal mode, Highlight mode, Selected mode). Used event handlers (MouseDown, MouseUp, MouseMove, MouseLeave) and useRef hooks to change the button modes on usage - pixel perfectly. No useState hook is used in the Canvas component.
  4. Learnt about requestAnimationFrame web api to draw Rectangles, Circles, Lines (Eg; When you press and drag to create rectangle, you need to delete each rectangle you had drawn previously so that the new rectangle at a new mouse position can be seen - before you release the mouse to draw it)
  5. Freehand drawing implemented by connecting lines.
  6. Undo-Redo implemented. At first, I stored the canvas images after each drawing inside an Array, so that i could undo-redo linearly (not an undo-redo tree). But localstorage only allows 5MB max, and one pixel stores 4 bytes ie; 1920*1080 canvas means approx. 8mb. Can't be done. So I stored Vectors (Drawing coordinates) of each drawing inside Undo-Redo array. That's it.
  7. When Undo-ing, I had to redraw everything from start of the array to the end. Which caused lag. So I implemented Offscreen canvas - to offload the redraws and then only render after that inside the drawing canvas - Improved performance in Undos.
  8. Canvas vim implemented using keydown event handlers - built with developer comfort in mind (Developers will be using Draw-code)
      - **Learnings :**
        1. Canvas manipulation
        2. Geometry calculations in code
        3. Web apis
- **Code Engine** :
  <img width="1549" height="1532" alt="image" src="https://github.com/user-attachments/assets/81851fca-8a47-466c-ad9c-5e5e8276a7e0" />
  <img width="879" height="451" alt="image" src="https://github.com/user-attachments/assets/6444eacc-0d68-498c-bd47-9b59242ce179" />
  1. Learnt about containerization. Used docker to containerize Coding judges. Created Docker images using Dockerfile, ran the containers using the runtime config ie; docker-compose.yaml. Used Docker compose cli to run the judges.
  2. Created custom function for deep comparing User's result object (object Array or object Object, or anything else) with the Solution object. Here : [Custom functions](https://github.com/ramarthyasc/customFunctions)
      - **Learnings :**
        1. Containerization
        2. Debugging & fixing errors
        3. Node Buffers, Regex (String manipulation)
        4. Async Js (Promises), JS event loop system (Callstack, Webapis, Microtask queue, Macrotask queue, Event loop)
        5. Node child processes (Pipes, Forking, File Descriptor inheritance)
        6. Server error handling (To not let it crash when error happens)
- **Custom Jwt with Rotating Refresh token** :
  <img width="1887" height="2036" alt="image" src="https://github.com/user-attachments/assets/ac65c369-f89a-4ccc-8f29-5e992c054bae" />
  1. Learnt about JWT, SHA256 hashing, HMAC, and used a containerized Postgresql to store the Refresh token.
  2. All the cases of hacking are tested manually using Curl cli tool.
    1. Implemented an Absolute expiry for the Refresh token chain so that even if a hacker gets a valid RT, but the user is idle, then the Refresh token chain will expire after the abs.exp time. So that hacker can't rotate the refresh token infinitely.
    2. If a refresh token is stolen, after the user or the hacker rotates the refresh token, then the subsequent refresh token rotation request would cause every Refresh tokens of that user's device (hacker copied one of it) to be revoked. Thus logging the user and hacker out.
  3. Refresh tokens are stored in httpOnly cookies to disable js accessing the cookie, and with SameSite=Lax to prevent CSRF, and jwt is in client memory.
    - **Learnings :**
      1. OAuth
      2. Jwt signing (HMAC) using SHA256 hashing algorithm
      3. Refresh tokens (with Rotation)
      4. Manual testing using Curl
- **Administrator** :
  1. Created a CRUD application for Adding, Deleting, Updating, Reading Questions.
  2. In the frontend, used useState hooks, useSearchParams hook (react router) for Pagination, useParams hook for retrieving the route parameters, useEffects for adding after effects, useNavigation for navigating programmatically.
  3. In the backend, created beautiful Restful API end points for CRUD operations.
     - **Learnings :**
      1. Pagination (using query parameters)
      2. React hooks
      3. Error handling in React (using custom Error handler Class component)
      4. Commonjs and ES modules usage
- **Homepage & Other Components** :
  1. Created Svgs for the Homepage
  2. Created Custom hook for datafetching from secure routes (If invalid/expired jwt, then would refetch at a refreshtoken end point to get a new jwt and a refresh token - if the current refresh token is valid. If the current RT is not valid, then logsout the user using useState hooks). Created utility button components for repeated usage. Here are [Custom hooks and Utility components](https://github.com/ramarthyasc/utility-components)
     - **Learnings :**
      1. Custom hooks
      2. Utility components
- **Testing** :
  <img width="913" height="375" alt="image" src="https://github.com/user-attachments/assets/f654a33a-9831-4466-a6d0-bed22d8d4177" />
  1. Integration testing (Backend and Database): Supertest api testing library used inside Jest testing framework to give input into the Backend which communicates with the DB inside testcontainer. Output is asserted and if the assertions are true, then tests are passed.
     - **Learnings :**
      1. Automated integration testing
      2. Testing with containers
 - **Configurations** :
  1. Created a Monorepo setup using npm workspaces (To share node modules between frontend app and backend app - which reduces space, and improves speed of first time project setups).
  2. Configured Jest, Typescript (tsconfig -> allowJs allows Js modules to be imported inside TS modules)
    - **Learnings :**
      1. Giving compile time typesafety for JS functions using JSDocs (When importing functions from JS modules into TS)
    
That's it.. That was the process.

## 🔨 How can this be improved 
1. I had used localstorage for storing the undo-redo array which forced me to store vectors (Drawn shapes' coordinate data) instead of imageData in it - to restrict the memory usage (As Local storage maximum size is 5MB). But it reduces undo performance slightly when there are large single freehand drawings (even though i used offscreenCanvas). I would improve this by storing image data in the undo-redo array- but in indexed db instead of local storage.
2. I will be implementing Vim motions in the Coding space too.

## Running the Project for Development :
1. Clone the repo into a directory
2. `npm install` in the project root directory to install the required dependencies for both frontend and backend workspaces (Monorepo setup).
3. `npm run dev` from the project root directory to run the backend and frontend (Vite) servers.
4. Install docker. Then, cd into the `postgresql` directory at project root directory, and do `docker compose up` to spin up the psql container and adminer (Admin panel for Db)
5. Open a browser, and go to [http://localhost:5173/](http://localhost:5173/) - to run the app locally.

## 🍿 Preview :
1. Video (Audio On): **Creating a new question from the admin page (also shows role based authorization) by randomly selecting it from leetcode, then submitting the solution code to get the results** :



https://github.com/user-attachments/assets/3f6988b4-d385-497d-b4fb-91f7def52d85






2. Video (Audio On): **How you can use 'Canvas Vim' to quickly draw out your solution before coding it from Codespace (Before Canvas vim Vs With Canvas vim)**:





https://github.com/user-attachments/assets/750b2f56-c543-4d06-a1ad-6b1ce6f25822








For more videos (errors & fix videos) on draw-code app, visit [my X profile](https://x.com/r_amarthya_sc)

## What next ? 
Deployment of Draw-Code app.


