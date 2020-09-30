const path = require('path')
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

require('dotenv').config({
  path: path.join(__dirname + '/.env.local')
})
 
const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname + "/build",
    remoteRoot: "/public_html/v3/",
    include: ['*', '**/*'],
    exclude: [
      "build/**/*.map", 
      "build/**/**/*.map", 
      "src/*", 
      "node_modules/**", 
      "node_modules/**/.*", 
      ".git/**"
    ],
    deleteRemote: false,
    forcePasv: true
};
 
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));