require('dotenv').config()
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();
 
var config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_HOST,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/public_html/v3/",
    include: ["build/*"],
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