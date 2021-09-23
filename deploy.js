require('dotenv').config();
const FtpDeploy = require("ftp-deploy");

const ftpDeploy = new FtpDeploy();
 
var config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname + "/out",
    remoteRoot: "/",
    include: ["*", "**/*"],     
    exclude: [],
    deleteRemote: false,
    forcePasv: true
};

ftpDeploy.on("uploaded", function(data) {
  console.log(`Uploaded ${data.transferredFileCount}/${data.totalFilesCount} ${data.filename}`); 
});
ftpDeploy.on("log", function(data) {
  console.log('log', data); 
});
ftpDeploy.on("upload-error", function(data) {
  console.log(upload-error, data);
});

console.log("Let's deploy the website 😱")

ftpDeploy
    .deploy(config)
    .then(res => console.log("Deploy finished! 🤘"))
    .catch(err => console.log(err));
