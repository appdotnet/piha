# Piha: ADN Social Buttons

Instead of forcing everyone to run code hosted on our servers we decided to do something new with social buttons. You can host these buttons your self. We have even created and two different hosting methods: heroku, and aws. Also, if you decide that you would rather not host these buttons your self, you can use our hosted version.

## The Buttons

To insert a button into a webpage you will start by creating an anchor tag. Even if the javascript doesn't load this anchor tag should still be able complete the action it was intended for.

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

the html:

```
<a href='https://alpha.app.net/intent/post/?text=hello+world' data-type='share' data-width='167' data-height='38' data-text='hello world'>
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

the html:

```
<a href='https://alpha.app.net/intent/follow/?user_id=@adn' data-type='follow' data-width='204' data-height='38' data-user-id='@adn'>
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
            <td><code>data-user-id`</td>
            <td>Either a @username, or numeric user id.</td>
            <td>The target user id.</td>
        </tr>
    </tbody>
</table>

## The Script

After you have inserted all the buttons you want on a page you can then include a script tag. You can use our hosted version, or you can host your own.

```
<script src='https://d2zh9g63fcvyrq.cloudfront.net/adn.js'></script>
```

# Using our hosted version

Right now we have two buttons. A Share on App.net, and Follw Me on App.net button. To start, you will insert links where you will want the buttons to show up. Then you will insert one script tag at the bottom of your page. When the script runs it will replace the link tags with iframes that will have buttons in them.

We think this will provide reasonable protection against our site going down, while also providing you with a link that will still work.

# Getting started hosting your own version

Before you start you will need npm, installed on your machine, you can get it through your package manager.

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

To just build the buttons you can run:

```sh
grunt build
```

To create the 'dist/' directory and assets you need to deploy.

## Deploying

There are two deploy options supported: Heroku, and Amazon S3/Cloudfrount.

### Heroku Deploy

We assume that you have already installed the [Heroku tools](https://devcenter.heroku.com/articles/quickstart).

Usually, your git root is what you deploy to heroku, but because of our build system we want to deploy a specific folder. In order to do that you must install a heroku plugin: [heroku-push](https://github.com/ddollar/heroku-push)

To setup your heroku deploy do the following:

```sh
# This assumes you have already install the heroku tools
heroku plugins:install https://github.com/ddollar/heroku-push
heroku create --stack cedar
grunt build deploy:heroku
heroku push ./dist
```

At this point you should be able to go to something like `https://app-name-on-heroku.herokuapp.com/test.html` and see the test page.

### S3/Cloudfront Deploy

There are many way to host things on AWS, this is only meant to cover hosting our social buttons on Cloudfront via a S3 backend. For instance, you could remove Cloudfront from this equation and just use static website hosting on a S3 bucket.

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
