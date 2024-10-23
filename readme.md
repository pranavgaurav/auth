Agenda
    1. JWT - JSON Web Token
    2. 
        AuthN- Authentication
        AuthZ- Authorization
    3. Middle Ware


<!-- 
deluxe superdulex premium  -->

<!-- economy  basic premium -->


<!-- INTERNSHALA -->
<!-- 
    <!-- 1. Viewer
    2. Enrolled Student   
    3. Teacher   
    4. Admin --> -->


AuthN-  Method of verifying identity of consumer 
        to ensure they are who them claim to be.


AuthZ-  Method of figuring out & granting
        permission to a user.


CLIENT -----------REQUEST------>--- SERVER

CLIENT ---------<--RESPONSE--------SERVER


CLIENT ------>---[MIDDEL WARE]--->--  SERVER

Middleware runs after the server gets a request but before the controller sends back a response. It can access and change the request and response objects, allowing it to handle the request before the server replies.

Middleware acts as a tool that lets you catch and modify requests and responses before they reach the route handlers.

Middleware functions take three inputs: the request object, the response object, and a next function that continues the process. In simpler terms, it's two objects and one function.


<!-- MIDDLE WARE CHAINING -->

    <!-- login-select course- select batch- select instructor- payment -->


JWT- JSON Web Token

3 parts
    1. header
    2. payload
    3. Signature

    When user login , server generated COOKIE(JWT Token) and send it to Client as resposne.

    Client then include JWT token in header of future requests



