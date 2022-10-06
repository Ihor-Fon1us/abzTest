module.exports = {
    SERVER: process.env.PORT_SERVER || 3000,
    POSTGRES_USER: process.env.POSTGRES_USER || "root",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "root",
    POSTGRES_DB: process.env.POSTGRES_DB || "test_db",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "172.17.0.1",
    COST_JWT: process.env.COST_JWT || "testcost"
}