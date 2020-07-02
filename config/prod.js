//prod.js - production keys here!!!
module.exports = {
    expressPort: process.env.PORT,
    mongodbConStr: process.env.MONGODB_CON_STR,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubSecert: process.env.GITHUB_SECRET
};
