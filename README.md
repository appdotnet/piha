# ADN Social Buttons

You can use the hosted version of this instead of running it your self. For more details read the blog post, or checkout the button info page on App.net.

## Getting Started

To start you will need npm installed on your machine, you can get it through your package manager.

First off, you need 'grunt-cli' install globally:

```sh
sudo npm install -g grunt-cli
```

Then do the following to get a development environment running (run this in the directory you checked out the git repo to):

```sh
npm install
grunt dev
```

You should now have a server running on http://localhost:9001.

To test if your button build is working go to http://localhost:9001/test.html

Alternatively, if you only want to deploy the buttons using the instructions below, you can run:

```sh
grunt build
```

To create the 'dist/' directory and assets you need to deploy.

## Deploying

There are two deploy options supported: Heroku, and Amazon S3/Cloudfrount.

### Heroku Deploy

We assume that you have already installed the [Heroku tools](https://devcenter.heroku.com/articles/quickstart).

Usually, your git root is what you deploy to heroku because of our build system we want to deploy a specific folder. In order to do that you must install a heroku plugin: [heroku-push](https://github.com/ddollar/heroku-push)

To setup your heroku deploy do the following:

```sh
# This assumes you have already install the heroku tools
# Install the plugin
heroku plugins:install https://github.com/ddollar/heroku-push
heroku create --stack cedar
grunt build deploy:heroku
heroku push ./dist
```

### S3/Cloudfront DeployA

There are many way to host things on AWS, this is only meant to cover hosting our social buttons on Cloudfront via a S3 backend. For instance, you could remove Cloudfront from this equation and just use static website hosting on a S3 bucket to host everything.

We assume that you have created a S3 bucket in AWS, and that you've also created a Cloudfront distribution that points to the bucket (setting these up is outside the scope of this document, refer to AWS documentation on how to do it). Also, you'll need at least s3cmd version 1.1.0-beta3 installed. You can get it at their website, [s3cmd.org](http://s3tools.org/download).

First, you need to setup s3cmd:

```sh
s3cmd --configure
```

It will walk you through the setup, and have you enter in both your Access Key and your Secret Key. After that is done, you can sync the dist folder up to AWS:

```sh
s3cmd --cf-invalidate sync <path_to_git_repo>/dist/ s3://<bucket_name>/
```

For every file that is synced, the '--cf-invalidate' argument will scan your Cloudfront distributions for the one hosting that file, and send a invalidation request.
