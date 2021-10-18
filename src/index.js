#!/usr/bin/env node
/**
 * Service names port numbers (SNPN)
 * is a simple library to get which service is *commonly* assigned to a port
 * Reference: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
 * 
 * Author: Aldrin A. Navarro
 * Date created: Oct. 16, 2021
 */
import cli from "commander";
import serviceFromPorts from "./commands/services";
import init from "./commands/init";

cli.description("Service names port numbers");
cli.name("snpn");
cli.usage("<command>");

cli.command('p')
    .argument('<port...>', 'Port number to search for assigned services.')
    .description(
        'Retrieve a list of services commonly assigned to the port'
    )
    .action(serviceFromPorts);

cli.command('i').action(init);  // @TODO Do not document. Find a way to integrate initially on install.

cli.parse(process.argv);