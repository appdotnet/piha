# Piha: ADN Social Buttons

We wanted to make our social buttons as flexible as possible, so instead of forcing you to use our hosted version of them, we are opening them up so you can self host them. Below we've documented how to deploy them to 2 different services: Heroku and AWS.

**If you don't want to host your own buttons**, we still have a hosted version you can use if you don't want to go through the process of setting it up yourself. Just follow the same configuration process, and use our hosted JavaScript.

## The Buttons

To insert a button into a webpage you will start by creating an anchor tag. Even if the javascript doesn't load this anchor tag should still be able to complete the action it was intended for.

To configure the button you will add a number of data attributes to the anchor tag. There are a few common attributes and some that are specific to each button.

### Common Attributes

<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Values</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>data-type</code></td>
            <td><code>share</code>, or <code>follow</code></td>
            <td>The type of button you are embedding.</td>
        </tr>
        <tr>
            <td><code>data-width</code></td>
            <td>integer</td>
            <td>The width of the embedded iframe.</td>
        </tr>
        <tr>
            <td><code>data-height</code></td>
            <td>integer</td>
            <td>The height of the embedded iframe.</td>
        </tr>
    </tbody>
</table>

### Share On App.net Button

HTML:

```
<a href='https://alpha.app.net/intent/post/?text=hello+world' data-type='share' data-width='167' data-height='38' data-text='hello world'>...</a>
```

<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Values</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>data-text</code></td>
            <td>string</td>
            <td>Text of a pre-composed post.</td>
        </tr>
    </tbody>
</table>

### Follow Me on App.net Button

HTML:

```
<a href='https://alpha.app.net/intent/follow/?user_id=@adn' data-type='follow' data-width='204' data-height='38' data-user-id='@adn'>...</a>
```

<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Values</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>data-user-id</code></td>
            <td>Either a @username, or numeric user id.</td>
            <td>The target user id.</td>
        </tr>
    </tbody>
</table>

# The Script
* * *

After you have inserted all the buttons you want on a page, you then need to include a script tag. This is where the instructions will deviate depending on if you are using our hosted version or your own self hosted version. If you are using our hosted version, here's the snippet:

```
<script src='https://d2zh9g63fcvyrq.cloudfront.net/adn.js'></script>
```

If you are self hosting, just substitute in the URL to your version. Below are instructions to get you started.

# Getting Started Hosting Your Own Version
* * *

**NOTE: We are assuming you are in a linux environment. Commands will be different on other platforms.**

Before you start you will need npm installed on your machine, which you can get through your package manager or from [nodejs.org](http://nodejs.org/download/ "NodeJS downloads").

First off, you need 'grunt-cli' installed globally:

```sh
sudo npm install -g grunt-cli
```

Then do the following to get a development environment running (run this in the directory you checked out the git repo to):

```sh
npm install
grunt dev
```

You should now have a server running on `http://localhost:9001`.

To test if your button build is working go to `http://localhost:9001/test.html`.

To just build the buttons you can run:

```sh
grunt build
```

To create the `dist/` directory and assets you need to deploy.

## Deploying

There are any number of ways you could self host these files; we wanted to highlight 2 of the easier ones: Heroku and AWS.

### Heroku Deploy

We assume that you have already installed the [Heroku Toolbelt](https://toolbelt.heroku.com/ "Heroku Toolbelt"). There is a detailed guide at [Getting Started with Heroku](https://devcenter.heroku.com/articles/quickstart "Getting Started with Heroku").

Usually, your git root is what you deploy to heroku, but because of our build system we want to deploy a specific folder. In order to do that you must install a heroku plugin: [heroku-push](https://github.com/ddollar/heroku-push).

To setup your Heroku deploy do the following:

```sh
heroku plugins:install https://github.com/ddollar/heroku-push
heroku create --stack cedar
grunt build deploy:heroku
heroku push ./dist
```

At this point you should be able to go to something like `https://app-name-on-heroku.herokuapp.com/test.html` and see the test page.

### AWS Deploy

There are many ways to host things on AWS, this is only meant to cover hosting our social buttons on Cloudfront via a S3 backend. For instance, you could remove Cloudfront from this equation and just use static website hosting on a S3 bucket.

We assume that you have created a S3 bucket in AWS, and that you've also created a Cloudfront distribution that points to the bucket (setting these up is outside the scope of this document, refer to AWS documentation on how to do it). Also, you'll need at least s3cmd version 1.1.0-beta3 installed. You can get it at their website, [s3cmd.org](http://s3tools.org/download "S3cmd dowloads").

First, you need to setup s3cmd:

```sh
s3cmd --configure
```

It will walk you through the setup, and have you enter in both your Access Key and your Secret Key. After that is done, you can sync the dist folder up to AWS:

```sh
s3cmd --cf-invalidate sync <path_to_git_repo>/dist/ s3://<bucket_name>/
```

For every file that is synced, the `--cf-invalidate` argument will scan your Cloudfront distributions for the one hosting that file, and send a invalidation request.
