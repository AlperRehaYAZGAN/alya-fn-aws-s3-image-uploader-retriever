[![Contributors][contributors-shield]][contributors-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

<p align="center">
  <h3 align="center">Alya-fn AWS S3 upload and retrieve image resource Cloud Function</h3>
  <br/>
  


  <p align="center">
    Simple cloud function for Handling AWS S3 storage file uploader and file retriever by file key. Cloud native nest api tool built with (Nest.js)[https://nestjs.com/]!
    <br />
    <a href="https://nestjs.com/"><strong>Explore the Nest.js »</strong></a>
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#todo">TODO</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

Cloud functions make development and testing easier. Almost every project, project can be divided into several parts to manage individually. One of these parts is <strong>File upload and retrieve reource</strong> utility. In this repository, I'm aiming to create a individual docker cloud function with Nest.js for upload **image** file to AWS S3 storage and retrieve image file by key with just one container. 

### Built With

- [Nestjs](https://nestjs.com//) for Node.js Framework
- [Multer-s3](https://www.npmjs.com/package/multer-s3) for Multer storage option

## Getting Started
### Prerequisites

- Docker (for build Docker-image *OPTIONAL)
  ```sh
  Install docker on your OS  
  https://docs.docker.com/get-docker/  
  ```
- Nest.js
  ```npm
  npm i -g @nestjs/cli
  ```

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever.git  
   cd alya-fn-aws-s3-image-uploader-retriever
   ```
2. Build docker image:
   ```sh
   docker build -t alyas3handler:1.0.0 .
   ```
3. Run Docker container:
   ```sh
   docker run --name alya-s3-handler \ 
   -e APP_PORT=3000 \ 
   -e AWS_S3_ACCESS_ID=MY_ACCESS_ID \ 
   -e AWS_S3_SECRET_KEY=MY_ACCESS_SECRET \ 
   -e AWS_S3_BUCKET_NAME=MY_BUCKET_NAME \ 
   -e AWS_S3_REGION=MY_REGION \ 
   -p 3000:3000 \ 
   -d alyas3handler:1.0.0
   ```

## Usage

This cloud function has a one endpoint to handle whole process. If we assert server is listening on 3000 port, example requests are:

- GET / : Retrieves file by given req.query.key value or 404 

```sh
   curl -X GET -G \  
   "http://localhost:3000/upload" \ 
   -d key=pp_125x125.webp
   -o output.webp
   ```

- POST / : Upload Image file to S3 then return all information

```sh
    curl -X POST \ 
    -F "resource=@/home/app/test.jpg" \ 
    "http://localhost:3000/upload"
   ```



## Roadmap

See the [open issues](https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever/issues) for a list of proposed features (and known issues).

## TODO  
- [X] Image upload and retrieve  
- [-] Image optimizition before uploading
- [-] AUTH Guard for private files  

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Alper Reha YAZGAN - [@alperreha](https://twitter.com/alperreha) - alper@yazgan.xyz

Project Link: [https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever](https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever.svg?style=for-the-badge
[contributors-url]: https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever.svg?style=for-the-badge
[issues-url]: https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever/issues
[license-shield]: https://img.shields.io/github/license/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever.svg?style=for-the-badge
[license-url]: https://github.com/AlperRehaYAZGAN/alya-fn-aws-s3-image-uploader-retriever/blob/master/LICENSE.txt
