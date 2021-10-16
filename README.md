# snpn

Service names port numbers (SNPN) is a simple library to get which service is *commonly* assigned to a port

Reference: https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml

## Development

```
$ git clone git@github.com:aldnav/snpn.git && cd snpn
$ npm i
$ npm run watch
$ npm install -g .       # install snpn globally
$ snpn -h
$ snpn i                 # init database
$ npm uninstall -g snpn  # uninstall
```

## Usage

```
Usage: snpn <command>

Service names port numbers

Options:
  -h, --help      display help for command

Commands:
  p [port]        Retrieve a list of services commonly assigned to the port
  i
  help [command]  display help for command
```

```
$ snpn p 5432
Looking up services with port 5432...
postgresql (tcp)	PostgreSQL Database
postgresql (udp)	PostgreSQL Database
postgresql (udp)	PostgreSQL Database
postgresql (tcp)	PostgreSQL Database
```