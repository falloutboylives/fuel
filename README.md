# FUEL

This is a design for a portable app package. The default implementation is based on existing widely distributed apps, to avoid folks having to trust yet another executable. The FUEL definitions rely on other existing definitions and standards (e.g. HTML 5.1).

The core principles behind FUEL are:

1. A package encapsulates a functional app that runs on the engine
2. The engine and the packages are platform agnostic
3. It uses the web platform for it's user interface (HTML, CSS, Javascript)

Although this package could be extended to support non-portable (e.g. binary) executables that is not a goal.

(TBD) FUEL is an acronym for Friendly Universal Executable Library.

## Compliance

A FUEL compliant engine implementation will include:

- Javascript engine (e.g. node)
- user interface engine (e.g. browser)
- package runner (e.g. fuel-engine/fuel.js)

These can be integrated into a single executable or exist separately.

These behaviors are required for a compliant FUEL implementation.

- Support package extraction as described in [FUEL Package Layout](./docs/fuel-package-layout.md)
- Support package verification as described in [FUEL Package Signature](./docs/fuel-package-signature.md)
- Support all manifest fields described in [FUEL Package Manifest](./docs/fuel-package-manifest.md)
- Support the service interface described in [FUEL Service Interface](./docs/fuel-service-interface.md)
- Support the application interface described in [FUEL Application Interface](./docs/main/fuel-application-interface.md)
- Support the order of operations described in [FUEL Operation](./docs/fuel-operation.md)

### Optional support

An engine might also support the following:

- Engine configuration
- Installing packages
- Running installed packages

## References

- I am attempting to follow the [Google conventions for Javascript](https://google.github.io/styleguide/jsguide.html)
