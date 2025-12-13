import {GenericContainer} from "testcontainers";

export function generateDatabaseContainer() {
    const dbTestcontainer = new GenericContainer("draw-code/postgres:latest")
    .withEnvironment({
        "POSTGRES_USER": "mock",
        "POSTGRES_PASSWORD": "mock",
        "POSTGRES_DB": "mock",
    })
    .withExposedPorts({
        container: 5432,
        host: 5432
    })

    return dbTestcontainer;
}
