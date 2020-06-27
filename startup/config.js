const config = require("config");

module.exports = function() {
    if (!config.get("VidlyJwtPrivateKey")) {
        throw new Error("FATAL ERROR: JwtSecret Key is not Defined!");
        process.exit(1);
    }
}