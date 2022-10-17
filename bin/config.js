module.exports = {
    SERVER: process.env.PORT_SERVER || "3000",
    POSTGRES_USER: process.env.POSTGRES_USER || "root",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "root",
    POSTGRES_DB: process.env.POSTGRES_DB || "test_db",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "127.0.0.1",
    COST_JWT: process.env.COST_JWT || "testcost",
    PHOTO_FOLDER: process.env.PHOTO_FOLDER || "./images/users",
    TINIFY_KEY: process.env.TINIFY_KEY || "qSy8Bxxm6Zym101zzl643PBFtqVQbTKB"
}
