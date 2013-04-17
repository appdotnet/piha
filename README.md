# ADN Social Buttons

You can use the hosted version of this instead of running it your self. For more details read the blog post, or checkout the button info page on App.net.

## Getting Started

To start you will need npm, ruby & bundler installed on your machine. Then do the following to get a development environment running.

```sh
npm install
grunt dev
```

You should now have a server running on http://localhost:9001.

To test if your button build is working go to http://localhost:9001/test.html

## Deploying

There are two deploy options supported: Heroku, and Amazon s3 / Cloudfrount.

### Heroku Deploy

We assume that you have already installed the [Heroku tools](https://devcenter.heroku.com/articles/quickstart).

Usually, your git root is what you deploy to heroku because of our build system we want to deploy a specific folder. In order to do that you must install a heroku plugin: [heroku-push](https://github.com/ddollar/heroku-push)

To setup your heroku deploy do the following

```
# This assumes you have already install the heroku tools
# Install the plugin
heroku plugins:install https://github.com/ddollar/heroku-push
heroku create --stack cedar
grunt build deploy:heroku
heroku push ./dist
```



