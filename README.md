# Modulize (mdz)

## Project Brief

### Summary

Modulize is a bash task runner script designed to provide flexibility in managing and executing tasks for modular projects. It allows you to run specific tasks on individual modules or the entire project, making it easier to maintain and control the build process.

### Goal Details

The main goal of Modulize is to automate the execution of tasks within modular projects, allowing developers to focus on the code and functionality of their applications. By handling tasks such as build, test, and deployment, Modulize reduces the time and effort required to manage these tasks manually.

### Target Audience

Modulize is intended for developers and DevOps engineers working on modular projects, specifically those who need a lightweight and efficient solution for managing tasks within their projects.

### Promise

Modulize promises to streamline the management and execution of tasks within modular projects, offering a simple and flexible solution to improve productivity and reduce the time spent on manual task management.

## Tech Stack

Modulize is implemented using the following technologies:

-   Bash scripting
-   Environment variables and configuration files

## Features

-   Task execution for individual modules or entire projects.
-   Environment-specific configuration support.
-   Automatic discovery of modules and submodules.
-   Simple and intuitive command-line interface.
-   Color-coded output for enhanced readability.

## Installation

### Requirements

-   Bash (version 4.0 or higher)
-   Access to a UNIX-based system (Linux, macOS)

### Install

-   Download or clone the Modulize repository to your local machine.
-   Ensure the main script (modulize.sh) is executable by running `chmod +x modulize.sh`.
-   Add `config/config.common.env` to your project root directory and add the following environment variables:

```bash
# 0/ Colors
NC='\033[0m' # No Color
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

# 1/ Project modules in order of execution
INSTALL_PROJECT_MODULES=("assets" "backend" "frontend")
UNINSTALL_PROJECT_MODULES=("assets" "frontend" "backend")

# 2/ Project names -------------------------------------------------------
# Must be lower-case, no spaces and no invalid path chars.
PROJECT_NAME=project-name
COMPOSE_PROJECT_NAME=project-name
```

-   Each module should have a `config.env` file containing the environment-specific configuration for that module.
    -   Example: `frontend/config.env`

```bash
# 1/ Module name
MODULE_NAME="frontend"

# 2/ Project modules in order of execution
INSTALL_MODULE_SUBPROJECTS=("nextjs-landing-page" "react-gallery-app" "vue-flash-card-app")
UNINSTALL_MODULE_SUBPROJECTS=("nextjs-landing-page" "react-gallery-app" "vue-flash-card-app")
```

-   Each module sub-module should have a `config.env` file containing the environment-specific configuration for that sub-module and a scripts directory containing the scripts that can be run by modulize

    -   Example: `frontend/nextjs-landing-page/config.env`

```bash
# 1/ Module name
MODULE_NAME="nextjs-landing-page"
```

    -   Example: `frontend/nextjs-landing-page/scripts/install.bash`

```bash
#!/bin/bash

# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

source ../config.env

rm -rfv ../node_modules
npm --prefix .. install
```

-   Simply invoke the script with the desired options to run the task on the specified modules.

```bash
./scripts/modulize.sh  -e dev -p install -m frontend
```

## Usage

To use Modulize, run the script with the following options:

-   `-p PHASE (mandatory)`: The task phase to run, such as "build" or "test".
-   `-e ENV (mandatory)`: The environment configuration to use, such as "dev" or "prod".
-   `-m MODULE (optional)`: The specific module to run the task on. If not specified, the task will run on all modules

## Post-MVP Improvements & To Do's

### Functional Improvements:

-   Support execution of tasks on modules and submodules in order specified in `INSTALL_*` or `UNINSTALL_*` variables
-   Support for additional task types, such as linting and code analysis.
-   Parallel execution of tasks for improved performance.
-   Integration with Continuous Integration (CI) and Continuous Deployment (CD) tools for seamless project management.
-   Enhanced error handling and reporting capabilities for better debugging.
-   Support for custom task plugins, allowing users to extend Modulize's functionality.

### Non-Functional Improvements:

-   Improved documentation and examples for easier adoption.
-   Performance optimizations for faster task execution.
-   Enhanced modularity and code organization for better maintainability.

## Modules
- [Installation & Boilerplate Starter Kit](https://github.com/paulAlexSerban/mod--boilerplate-starter-kit)

## Templates
- [Static Website](https://github.com/paulAlexSerban/tpl--static-website)

<!--
## Skeletons
### JAMStack
- [Eleventy (11ty)](https://github.com/paulAlexSerban/mod--11ty)

### Traditional Content Management Systems
- [Wordpress]()
- [Ghost CMS](https://github.com/paulAlexSerban/tpl--ghost-cms)

### Headless Content Management Systems
- [Next.js - Strapi](https://github.com/paulAlexSerban/tpl--nextjs-strapi-ssr)

### Revrese Proxy to Web Server/Service (RP2WS)
- [Traefik to Node.js](https://github.com/paulAlexSerban/tpl--traefik-nodejs)
- [Traefik to Nginx](https://github.com/paulAlexSerban/tpl--traefik-proxy--nginx-server)
- [Nginx to Httpd](https://github.com/paulAlexSerban/tpl--nginx-proxy--httpd-server)

## Modules
### Single Page APP / Client Side Rendering(CSR)
- [React.js](https://github.com/paulAlexSerban/tpl--reactjs)

### Server Side Rendering
- [Next.js](https://github.com/paulAlexSerban/mod--nextjs)

### Server Side Generators
- [Jekyll](https://github.com/paulAlexSerban/tpl--jamstack-jekyll)

### UI
- [Storybook - FE Style Guide](https://github.com/paulAlexSerban/tpl--fe-style-guide-storybook)
- [Living Style Guide](https://github.com/paulAlexSerban/tpl--living-style-guide)
- [JS Component Library](https://github.com/paulAlexSerban/tpl--js-component-library)

### Proxy & Reverse Proxy
- [Traefik](https://github.com/paulAlexSerban/tpl--traefik-proxy)

### Web Services
- [Flask Service](https://github.com/paulAlexSerban/tpl--flask-service)
- [Node.js Service](https://github.com/paulAlexSerban/tpl--nodejs-service)

### Web Servers
- [Nginx Service](https://github.com/paulAlexSerban/tpl--nginx-service)

[Portfolio Template](https://github.com/paulAlexSerban/project-boilerplate-archetype-n-framework)


## Tech Stacks
- [MERN - MongoBD, express, React.js, Node.js](https://github.com/paulAlexSerban/tpl--mern)

<!--
- LAMP
- NMP
- MEAN
- MEVN
-->

<!--
- Php
- ExpressJS - Ejs
-->

<!--
- Hugo
- Pelican
-->

<!--
## Server to Database

- ExpressJS - MongoDB
- ExpressJS - SQL
-->

<!--
## Server to Database
- Php - SQL
- NodeJS to MongoDB

## Database
- Redis
- Mongoose
- MongoDB
- PhpMyAdmin
- PostgresSql
- SQL
-->

<!--
- [ExpressJS (NodeJS v14)](https://github.com/paulAlexSerban/template-nodejs-14)
- [ExpressJS - Redis (NodeJS v14)](https://github.com/paulAlexSerban/template-nodejs-redis)
- [ExpressJS - EJS (NodeJS v14)](https://github.com/paulAlexSerban/ejs-template)
- [Style Guide Template](https://github.com/paulAlexSerban/style-guide-template)
-->


