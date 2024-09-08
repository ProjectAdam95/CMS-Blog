# CMS Tech Blog

A content management system (CMS) application that allows users to publish, edit, and comment on blog posts about tech topics.

## Introduction

CMS Tech Blog by Adam Todorovic

## :ledger: Index

- [About](#beginner-about)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)
  - [Deployment](#rocket-deployment)
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
- [Resources](#page_facing_up-resources)
- [Gallery](#camera-gallery)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

## :beginner: About

This CMS Tech Blog application allows users to create an account, log in, and publish blog posts. Authenticated users can comment on posts and edit or delete their own posts. The application provides a user-friendly interface with a dashboard to manage posts.

### Features include:
- User authentication (sign up, log in, and log out).
- Ability to create, edit, and delete blog posts.
- Commenting system where users can post, edit, and delete comments.
- Responsive layout for mobile and desktop devices.
- Secure session management with `express-session` and hashed passwords using `bcrypt`.
- Built using the MVC (Model-View-Controller) paradigm.

### :file_folder: File Structure

Below is a view of the file structure deployed to GitHub.

```plaintext

CMS-TECH-BLOG/
├── config/
│   └── connection.js  # Sequelize connection setup
├── db/
│   ├── schema.sql  # Database schema
│   └── seeds.sql   # Initial seed data
├── models/
│   ├── Comment.js  # Comment model definition
│   ├── index.js    # Index file for models
│   ├── Post.js     # Post model definition
│   └── User.js     # User model definition
├── public/
│   ├── css/
│   │   └── styles.css  # Main stylesheet
│   └── js/
│       ├── edit-post.js    # Frontend JS for editing posts
│       ├── login.js        # Frontend JS for login functionality
│       ├── logout.js       # Frontend JS for logout functionality
│       ├── new-comment.js  # Frontend JS for adding comments
│       ├── new-post.js     # Frontend JS for creating new posts
│       ├── script.js       # General frontend JS
│       └── signup.js       # Frontend JS for signup functionality
├── routes/
│   ├── api/
│   │   ├── commentRoutes.js  # API routes for comments
│   │   ├── index.js          # API index route
│   │   ├── postRoutes.js     # API routes for posts
│   │   └── userRoutes.js     # API routes for users
│   └── homeRoutes.js         # Routes for homepage and dashboard
├── seeds/
│   └── seed.js  # Seed data for initial database setup
├── utils/
│   ├── auth.js     # Authentication middleware
│   └── helpers.js  # Helper functions
├── views/
│   ├── layouts/
│   │   └── main.handlebars        # Main layout template
│   ├── dashboard.handlebars       # Dashboard page template
│   ├── edit-post.handlebars       # Edit post page template
│   ├── home.handlebars            # Homepage template
│   ├── login.handlebars           # Login page template
│   ├── new-post.handlebars        # New post page template
│   ├── post.handlebars            # Post detail page template
│   └── signup.handlebars          # Signup page template
├── .env  # Environment variables
├── .gitignore  # Files to ignore in version control
├── package-lock.json  # Package lock file
├── package.json       # Project dependencies and scripts
├── README.md          # Project README file
└── server.js          # Main server file


```
###  :hammer: 

Build
- MVC Paradigm: Follows the MVC structure for separating concerns between the data (models), the user interface (views), and control logic (controllers).
- File Management: Updated and modified files using the terminal (e.g., Git Bash) for version control operations such as adding, committing, and pushing changes.
- Code Editing: Utilized a code editor (e.g., VS Code) to modify existing code and implement new features as needed.
- Version Control: Consistently committed changes to a Git repository to maintain a detailed history of the project's progress.
- Authentication: Users can sign up, log in, and maintain authenticated sessions using express-session and bcrypt for secure password handling.
- Testing and Debugging: Thoroughly tested the application to ensure functionality across different browsers and devices, verifying cross-browser compatibility and responsiveness.
- Database: Sequelize ORM used for interacting with a PostgreSQL database. Models are used to structure the data for users, posts, and comments.
- Code Comments: Added concise comments throughout the HTML, CSS, and JavaScript files to explain the purpose and functionality of various code sections, enhancing readability and maintainability.
  This enables developers to easily read the code and identify how the application works. Notes have been added in the HTML, CSS and JS files.

### :rocket: Deployment

- To deploy the website please visit : ENTER WEBSITE HERE

 ###  :fire: Contribution

 - Your contributions are always welcome and greatly appreciated. Here are some ways you can contribute to the project:

 1. **Report a bug** <br>
 If you think you have encountered a bug, and I should know about it, feel free to report it here [here](ENTER WEBSITE HERE). I will look into it and take the necessary steps.
 
 2. **Request a feature** <br>
 If you have a feature idea that you think would enhance the project, you can request it [here](ENTER WEBSITE HERE), If the feature is deemed viable, it will be considered for development. 

 3. **Create a pull request** <br>
 The best way to contribute is by creating a pull request. The community will appreciate your efforts. You can start by picking up any open issues from [here](ENTER WEBSITE HERE)and submitting a pull request.

##  :page_facing_up: Resources

Software used
- VS Code -  A powerful code editor for writing and managing code across various programming languages.
- Git Bash - A command-line interface for Git, providing Unix-like shell commands for version control and repository management.

API's and Libraries
- Express.js: A Node.js framework for building web applications and APIs.
- Sequelize: An ORM for interacting with the PostgreSQL database.
- bcrypt: A library used for hashing passwords securely.
- express-session: Middleware for handling user sessions and authentication.

Development Tools:
- Browser Developer Tools: Built-in tools in web browsers like Chrome and Firefox, used for debugging and inspecting the application's HTML, CSS, and JavaScript.

##  :camera: Gallery
Below is a preview photo of the website.

Click here to view preview photos: ENTER WEBSITE HERE


## :star2: Credit/Acknowledgment
Adam Todorovic

##  :lock: License
This project is licensed under the MIT License.