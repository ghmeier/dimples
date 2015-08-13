# DimpleBot

A simple slack integration that returns a new meme based on the words entered after the slash command using [this](https://imgflip.com/memetemplate/42404825/Garret-Frolicking-Through-The-Grass) image.

It's built on express, the imgflip api, and slack webhooks, hosted on heroku.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:ghmeier/dimples.git # or clone your own fork
$ cd dimples
$ npm install
$ npm start
```

Dimples should now be running on [localhost:5000](http://localhost:5000/).
You can post data based on [slack's slash commands api](https://api.slack.com/slash-commands)

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
```
Configure your slash command like so:
![Slack Config](https://github.comd/ghmeier/dimples/images/slack_dimples.png)

Set the token value in index.js to your slack API token.

Now you have dimples!

