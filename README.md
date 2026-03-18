# GNSS Terminal app

[![License](https://img.shields.io/badge/license-Modified%20BSD%20License-blue.svg)](LICENSE)

The GNSS Terminal app allows you to connect to serial devices.

![screenshot](resources/screenshoot.gif)

## Installation

Install this app from `GNSS Launcher`.

Recommended source URL in launcher:

```text
https://github.com/weefnn/pc-gnss-terminal/releases/latest/download/source.json
```

After adding this source in launcher settings, `GNSS Terminal` appears in the
app list and can be installed with one click.

## Documentation

Read the
[GNSS local app runbook](https://github.com/weefnn/pc-gnss-launcher/blob/main/docs/superpowers/runbooks/gnss-local-app.md).

## Development

See the
[app development](https://nordicsemiconductor.github.io/pc-nrfconnect-docs/)
pages for details on how to develop apps for the nRF Connect for Desktop
framework.

## Release

GitHub tag releases (`v*`) publish these assets automatically:

- `pc-gnss-terminal-<version>.tgz`
- `release/source.json`
- `release/pc-gnss-terminal.json`

Local dry-run:

```bash
npm run release:bundle
```

## Feedback

Please report issues on the [DevZone](https://devzone.nordicsemi.com) portal.

## Contributing

See the
[information on contributing](https://nordicsemiconductor.github.io/pc-nrfconnect-docs/contributing)
for details.

## License

See the [LICENSE](LICENSE) file for details.
