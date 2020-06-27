const config = require("config");

module.exports = function() {
    if (!config.get("jwtPrivateKey")) {
        console.error("FATAL ERROR : JWT PRIVATE KEY IS NOT DEFINED");
        throw new Error("FATAL ERROR : JWT PRIVATE KEY IS NOT DEFINED");
        process.exit(1);
    }
}