import { expect } from "chai";
import { it } from "mocha";

import { execSync } from "child_process";
const snpn = (args) => {
  return execSync(`node dist/main.js ${args}`).toString();
}

describe('Port command responds with services', () => {
    it('When port is not provided throw an error', () => {
        expect(() => {
            snpn('p')
        }).to.throw(
            "Command failed: node dist/main.js p\n" +
            "error: missing required argument \'port\'\n"
        );
    });

    it('When a port is not valid throw an error', () => {
        expect(() => {
            snpn('p 9000 80x')
        }).to.throw();
    });

    it('When a port is provided and not found, say no results', () => {
        expect(snpn('p 80000000000')).to.equal(
            "Looking up services with port 80000000000...\n" +
            "No results.\n"
        );
    });

    it('When ports are known, display the service', () => {
        let output = snpn('p 5432 80 90000000');
        expect(output).to.include("Looking up services with port 5432...");
        expect(output).to.include("Looking up services with port 80...");
        expect(output).to.include("Looking up services with port 90000000...");
        expect(output).to.include("postgresql (tcp)	PostgreSQL Database");
        expect(output).to.include("www (tcp)	World Wide Web HTTP");
        expect(output).to.include("No results.");
    });
});