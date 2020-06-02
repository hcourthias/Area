import { execSync } from "child_process";

export default async () => {
    if (!process.env.CI)
        return;
    execSync(`kill ${global['__SERVER_PID__']}`);
};
