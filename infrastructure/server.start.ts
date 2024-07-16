import { App } from "./app";

try {
	void new App().start();
} catch (e) {
	process.exit(1);
}

process.on("uncaughtException", () => {
    console.log('error')
	process.exit(1);
});