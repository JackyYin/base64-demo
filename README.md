base64-demo  :flag_tw:
=================

Step by step setting up environment
--------------

### 1. install dependency
  ```sh
  npm install
  ```

### 2. install mongoDB server
  Please refer to: [docker-compose.yml](https://gist.github.com/JackyYin/a9e5acfecd1eb52afaee11298a53dc92)

### 3. set environment variables
  ```sh
  export MONGO_HOST=localhost
  export MONGO_PORT=27017
  export MONGO_USERNAME=root
  export MONGO_PASSWORD=root
  export MONGO_DATABASE=test
  ```

### 4. testing!

#### Insert Base64 images to mongoDB
  ```sh
  node image.js 1
  ```

#### Query Base64 images from mongoDB
  ```sh
  node image.js 2
  ```
