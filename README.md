# Vue.js and Nuxt.js CMS Project

This project is a content management system (CMS) developed using Vue.js, Nuxt.js 2.0 and Firebase. It allows administrators to log in, upload, edit, or delete articles, while regular users can view pages, blogs, and articles.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This CMS project serves as a platform for managing articles. It is built using the following technologies:

- Vue.js: A progressive JavaScript framework for building user interfaces.
- Nuxt.js 2.0: A framework for creating server-rendered Vue.js applications.
- Firebase: A real-time database and authentication service provided by Google.

The main functionalities of this CMS include user authentication, article management, and content viewing. Admins can log in to upload, edit, and delete articles, while regular users can access and read the articles, blogs, and pages.

## Features

- User Authentication: Secure login system for administrators.
- Article Management: Admins can create, edit, and delete articles.
- Content Viewing: Users can browse articles, blogs, and pages.
- Responsive Design: A mobile-friendly user interface.
- Real-time Updates: Firebase ensures real-time data synchronization.
- SEO-friendly: Nuxt.js provides server-side rendering for better SEO.

## Getting Started

### Prerequisites

Before you can run this project, you need to have the following software installed:

- [Node.js](https://nodejs.org/): To run JavaScript on the server.
- [Vue CLI](https://cli.vuejs.org/): To scaffold and manage the Vue.js application.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/vue-nuxt-cms.git
    ```
2. Navigate to the project directory:
    ```bash
    cd vue-nuxt-cms
    ```
3. Install project dependencies:
    ```bash
    npm install
    ```
## Configuration

Before running the project, you need to configure Firebase with your own API keys and settings. You can do this by following the docs in firebase and check the API calls that have been made in the project, or you can use mine Firebase credentials, I will leave the API Key in the project.

## Usage

To run the development server and view the CMS application, use the following command:

```bash
npm run dev
```
This will start the development server, and you can access the application in your web browser at http://localhost:3000.

## Contributing

Contributions to this project are welcome. If you find issues or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License. You are free to use and modify the code for your own purposes.

Happy coding! If you have any questions or need further assistance, feel free to reach out.