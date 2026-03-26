// In production, this key is stored in an environment variable for higher security
const { JWT_SECRET = "My$uper$ecretKey!" } = process.env;
module.exports = { JWT_SECRET };
