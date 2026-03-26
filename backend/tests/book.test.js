const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = "";

            res.on("data", (chunk) => (body += chunk));
            res.on("end", () => {
                resolve({
                    status: res.statusCode,
                    body: body ? JSON.parse(body) : null,
                });
            });
        });

        req.on("error", reject);

        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

// Helper log
function logTest(name, input, expected, actual) {
    console.log(`\n🔹 ${name}`);
    console.log("Input:", input);
    console.log("Expected:", expected);
    console.log("Actual:", actual);
}

const BASE = {
    hostname: "localhost",
    port: 5000,
    headers: { "Content-Type": "application/json" },
};

let createdBookId = null;


// 📚 TEST 1: Get all books
test("BOOK-01: Get all books", async () => {
    const res = await request({
        ...BASE,
        path: "/api/books",
        method: "GET",
    });

    logTest("BOOK-01 Get All Books", {}, 200, res.status);
    assert.strictEqual(res.status, 200);
});


// 📚 TEST 2: Get book by invalid ID
test("BOOK-02: Get book with invalid ID", async () => {
    const res = await request({
        ...BASE,
        path: "/api/books/invalidid",
        method: "GET",
    });

    logTest("BOOK-02 Invalid ID", "invalidid", 400, res.status);
    assert.strictEqual(res.status, 400);
});


// 📚 TEST 3: Create book without auth (should fail)
test("BOOK-03: Create book without auth", async () => {
    const data = {
        bookTitle: "Test Book",
        authorName: "Author",
    };

    const res = await request({
        ...BASE,
        path: "/api/books",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data)),
        },
    }, data);

    logTest("BOOK-03 Create without auth", data, "401/403", res.status);
    assert.notStrictEqual(res.status, 201); // should NOT succeed
});


// 📚 TEST 4: Create book missing fields
test("BOOK-04: Create book with missing fields", async () => {
    const data = {
        bookTitle: "", // invalid
    };

    const res = await request({
        ...BASE,
        path: "/api/books",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data)),
        },
    }, data);

    logTest("BOOK-04 Missing fields", data, 400, res.status);
    assert.strictEqual(res.status, 400);
});


// 📚 TEST 5: Get non-existing book
test("BOOK-05: Get non-existing book", async () => {
    const fakeId = "507f1f77bcf86cd799439011"; // valid Mongo ID

    const res = await request({
        ...BASE,
        path: `/api/books/${fakeId}`,
        method: "GET",
    });

    logTest("BOOK-05 Not Found", fakeId, 404, res.status);
    assert.strictEqual(res.status, 404);
});


// 📚 TEST 6: Delete without auth
test("BOOK-06: Delete without auth", async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request({
        ...BASE,
        path: `/api/books/${fakeId}`,
        method: "DELETE",
    });

    logTest("BOOK-06 Delete without auth", fakeId, "401/403", res.status);
    assert.notStrictEqual(res.status, 200);
});


// 📚 TEST 7: Update without auth
test("BOOK-07: Update without auth", async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const res = await request({
        ...BASE,
        path: `/api/books/${fakeId}`,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify({ bookTitle: "New" })),
        },
    }, { bookTitle: "New" });

    logTest("BOOK-07 Update without auth", fakeId, "401/403", res.status);
    assert.notStrictEqual(res.status, 200);
});