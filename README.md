# nodejs-cw-00018858
this app is being deployed

# Book Review App

This is a Book Review application built with Node.js, Express, and Pug engines. It allowes users to create, update, and delete book reviews. The data of all reviews is stored in a local JSON file. The interface of the app is styles with basic CSS. 

In order to run the application locally you can, first, clone the repository, install dependencies (npm install) and run it (npm start). Finally, visit (http://localhost:3000) to open th app in your browser.

*Link to the GitHub repo (https://github.com/00018858/nodejs-cw-00018858)*
*Link to the Live App:*

# Project structure:

Nodejs-cw-00018858
    app.js                                               # Main app file

    package.json                                         # Project data and dependencies

    README.md                                            # Project documentation

    data/                                                # JSON file
        reviews.json                                     
    
    public/                                              # Static files
        css/
            styles.css                                 
        js/
            scripts.js                                  

    views/                                               # Pug templates
        layout.pug                                       
        review/
            index.pug                                   
            create_update.pug                            

    routes/                                              # Express routes
        api/
            index.js
            review.js
        web/
            index.js
            revies.js
    
    controllers/                                         # Handling requests
        review.js

    services/                                            # File operations
        revies.js

    validators/                                          # Input validation
        review.js

