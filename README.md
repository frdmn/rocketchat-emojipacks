# rocketchat-emojipacks

CLI tool to upload [emojipacks](https://github.com/lambtron/emojipacks) emoji packages to Rockat.Chat instances:

[![](https://i.imgur.com/kUmjWaF.png)](https://up.frd.mn/js2B7s.mp4)

<sub><sup>(Click the screenshot above for a live demo video of the import process)</sup></sub>

## Installation

1. Make sure you've installed all requirements
2. Clone this repository:

    ```shell
    git clone https://github.com/frdmn/rocketchat-emojipacks
    ```

3. Install the project using `make`:

    ```shell
    make install
    ```

## Usage

Here's a short explanation how to use `rocketchat-emojipacks`:

1. Copy the default configuration file:

    ```shell
    cp config.sample.json config.json
    ```

2. Adjust it accordingly and set your Rocket.Chat credentials:

    ```shell
    vi config.json
    ```

3. Run the script with `--yaml` switch, pointing to a valid Emojipacks YML file:

    ```shell
    node emojipacks.js --yaml https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/slackmojis-party-parrot.yaml -d
    ```

## Emojipacks directories

- <https://github.com/lambtron/emojipacks/tree/master/packs>
- <https://github.com/lambtron/slackmojis-to-emojipacks>
- <https://github.com/alexmckenley/emojipacks>

## Contributing

1. Fork it
2. Create your feature branch:

    ```shell
    git checkout -b feature/my-new-feature
    ```

3. Commit your changes:

    ```shell
    git commit -am 'Add some feature'
    ```

4. Push to the branch:

    ```shell
    git push origin feature/my-new-feature
    ```

5. Submit a pull request

## Requirements / Dependencies

* Node
* Rocket.Chat > v0.67

## Version

1.0.0

## License

[MIT](LICENSE)