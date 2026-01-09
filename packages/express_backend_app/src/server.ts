import app from "./app.js";
import { seedQData } from './model/seed/seed';

const PORT: number = Number(process.env.PORT) || 3000;

seedQData()
    .then(() => {
        console.log("Seeding completed !!");
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`localhost @ port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Startup failed", err);
        process.exit(1);
    });

