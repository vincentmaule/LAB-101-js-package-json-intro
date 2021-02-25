# SASS

To build accordingly, this is the only command that is required: `node-sass source/scss/style.scss --output=compiled/css --output-style=compressed --source-map=true --watch`

# package.json

Allow person/developer to run a specific script: `npm run server`

Allow person/developer install software such as npm-run-all `npm install --save-dev npm-run-all` 

```
{  
"name": "sassy-project",  
  "version": "1.0.0",  
  "scripts": {
    "dev:server": "live-server",
    "dev:sass": "node-sass source/scss/style.scss --watch --output=compiled/css --output-style=compressed --source-map=true",
    "dev": "run-p dev:*",
    "build:sass": "node-sass source/scss/style.scss --output=compiled/css --output-style=compressed --source-map=true",
    "deploy:surge": "surge --project . --domain sassy-project.surge.sh",
    "deploy": "run-s build:* deploy:surge"
  },
  "devDependencies": {
    "live-server": "^1.2.1",
    "node-sass": "^4.14.1",
    "npm-run-all": "^4.1.5",
    "surge": "^0.21.3"
  }
}
```

With a `package.json` file like this, all the use would have to do is run npm run deploy, build, or whatever else need be.

### Ignoring files
#### File `.gitignore`/`.surgeignore`
node_modules/  
compiled/  
*.log*  
*.DS_Store