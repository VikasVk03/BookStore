// run test cases:  node --test filePath

const test = require("node:test")
const assert = require("node:assert")


const BASE_URL = "http://localhost:5000";

// Helper function
const http = require("node:http");
const id = Math.floor(Math.random() * 100)
const name = `Test user ${id}`
const email = `test${id}@mail.com`

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


test("AUTH-01: Register with valid data", async () => {

    // run this separately

    const data = {
        name,
        email,
        password: "12345678"
    }

    console.log("\n TEST:- AUTH-01: Register with valid data")
    console.log("Input: ", data)

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

    console.log("Expected: 200")
    console.log("Actual: ", res.status)

    assert.strictEqual(res.status, 200);

    // console.log("✅ PASSED")
});

test("AUTH-02: Register with invalid email", async () => {
    const data = {
        name: "Test User",
        email: "invalid-email",
        password: "12345678"
    };

    console.log("\n TEST:- AUTH-02: Register with invalid email")

    console.log("Input: ", data)


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

    console.log("Expected: 400")
    console.log("Actual: ", res.status)

    assert.strictEqual(res.status, 400);
});



test("AUTH-03: Register with invalid email (Expected Fail Demo)", async () => {
    const data = {
        name: "Test User",
        email: "invalid-email",
        password: "12345678"
    };

    console.log("\n🔹 TEST:- AUTH-03: Register with invalid email (Expected Fail Demo))");

    console.log("Input: ", data)

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

    console.log("Expected: 200 (WRONG EXPECTATION)");
    console.log("Actual:", res.status);

    // ❌ Intentionally wrong expectation
    assert.strictEqual(res.status, 200);
});


test("AUTH-04: Register with short password", async () => {
    const data = {
        name,
        email,
        password: "123" // ❌ too short
    };

    console.log("\n🔹 TEST:- AUTH-04: Register with short password");

    console.log("Input: ", data)

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

    console.log("Expected: 400")
    console.log("Actual: ", res.status)

    assert.strictEqual(res.status, 400);
});

test("AUTH-05: Register with short password (Expected Fail Demo)", async () => {
    const data = {
        name,
        email,
        password: "123" // ❌ too short
    };

    console.log("\n🔹 TEST:- AUTH-05: Register with short password (Expected Fail Demo)");

    console.log("Input: ", data)

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

    console.log("Expected: 400")
    console.log("Actual: ", res.status)

    assert.strictEqual(res.status, 200);
});


test("AUTH-06: Login with valid credentials", async () => {


    //in this test take email of register user and password and run test 
    //below register function will not work


    const email = "test16@mail.com"

    // const data = {
    //     name,
    //     email,
    //     password: "12345678"
    // }

    console.log("\n🔹 TEST:- AUTH-06: Login with valid credential");

    // console.log("Input: ", data)

    // console.log("First register with data")

    // // Register first
    // const registerRes = await request({
    //     hostname: "localhost",
    //     port: 5000,
    //     path: "/api/auth/register",
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Content-Length": Buffer.byteLength(JSON.stringify({
    //             name: "User",
    //             email,
    //             password: "12345678"
    //         }))
    //     },
    // }, data);

    // console.log("Register Status: ", registerRes)


    // console.log("Login with email and password")
    // Login
    const res = await request({
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify({
                email,
                password: "12345678"
            }))
        },
    }, {
        email,
        password: "12345678"
    });

    console.log("Expected: 200")
    console.log("Actual: ", res.status)

    assert.strictEqual(res.status, 200);
});


test("AUTH-07: Login with wrong password", async () => {
    const email = "test16@mail.com";

    // Register
    //   await request({
    //       hostname: "localhost",
    //       port: 5000,
    //       path: "/api/auth/register",
    //       method: "POST",
    //       headers: {
    //           "Content-Type": "application/json",
    //           "Content-Length": Buffer.byteLength(JSON.stringify({
    //               name: "User",
    //               email,
    //               password: "12345678"
    //           }))
    //       },
    //   }, {
    //       name: "User",
    //       email,
    //       password: "12345678"
    //   });

    // Wrong login
    const res = await request({
        hostname: "localhost",
        port: 5000,
        path: "/api/auth/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify({
                email,
                password: "wrong123"
            }))
        },
    }, {
        email,
        password: "wrong123"
    });

    assert.strictEqual(res.status, 401);
});

