// run test cases:  node --test filePath

const test = require("node:test")
const assert = require("node:assert")


const BASE_URL = "http://localhost:5000";

// Helper function
const http = require("node:http");

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                resolve({
                    status: res.statusCode,
                    body,
                });
            });
        });

        req.on("error", (err) => {
            console.error("Request error:", err);
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}


test("Register with valid data", async () => {
    const id = Math.floor(Math.random() * 100)
    const name = `Test user ${id}`
    const email = `test${id}@mail.com`

    const data = {
        name,
        email,
        password: "12345678"
    }
    const res = await request({
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/register",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data))
        },
    }, data);

    assert.strictEqual(res.status, 200);
});