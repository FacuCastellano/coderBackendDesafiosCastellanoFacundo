import fetch from "node-fetch";
import SimpleFaker, {
  METHOD_POST,
  METHOD_GET,
  METHOD_DELETE,
  METHOD_OPTIONS,
  METHOD_PATCH,
  METHOD_PUT
} from "./dist/main";

describe("Simple Faker fakes API calls", () => {
  [METHOD_PUT, METHOD_POST, METHOD_DELETE, METHOD_PATCH].forEach(method => {
    it(`should intercept ${method} calls`, async () => {
      const faker = new SimpleFaker(65533);

      const requestBody = { test: "testBodyRequest" };
      const requestHeaders = {
        "Content-Type": "application/json",
        test: "testHeaderRequest"
      };
      const answerBody = { test: "testBodyRequest" };
      const answerHeaders = { test: "testHeaderRequest" };

      let receivedBody = {};
      let receivedHeaders = "";
      faker.interceptCall("/", method, (req, res) => {
        if (method !== METHOD_GET) {
          console.log(req.body);
          receivedBody = req.body;
        }
        receivedHeaders = req.header("test");
        res.set(answerHeaders);
        res.json(answerBody);
      });

      const response = await fetch("http://localhost:65533", {
        method: method,
        headers: requestHeaders,
        ...(method !== METHOD_GET ? { body: JSON.stringify(requestBody) } : {})
      });
      expect(receivedBody).toEqual(answerBody);
      expect(receivedHeaders).toEqual(answerHeaders["test"]);

      const jsonResponse = await response.json();
      const testHeader = response.headers.get("test");

      expect(jsonResponse).toEqual(answerBody);
      expect(testHeader).toEqual(answerHeaders["test"]);

      await faker.close();
    });
  });

  [METHOD_GET, METHOD_OPTIONS].forEach(method => {
    it(`should intercept ${method} calls`, async () => {
      const faker = await new SimpleFaker(65533);

      const requestHeaders = {
        "Content-Type": "application/json",
        test: "testHeaderRequest"
      };
      const answerBody = { test: "testBodyRequest" };
      const answerHeaders = { test: "testHeaderRequest" };

      let receivedHeaders = "";
      faker.interceptCall("/", method, (req, res) => {
        receivedHeaders = req.header("test");
        res.set(answerHeaders);
        res.json(answerBody);
      });

      const response = await fetch("http://localhost:65533", {
        method: method,
        headers: requestHeaders
      });
      expect(receivedHeaders).toEqual(answerHeaders["test"]);

      const jsonResponse = await response.json();
      const testHeader = response.headers.get("test");

      expect(jsonResponse).toEqual(answerBody);
      expect(testHeader).toEqual(answerHeaders["test"]);

      await faker.close();
    });
  });
});
