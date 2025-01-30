# Weather AI Agent

This project is a Weather AI Agent that uses the `ollama` library to interact with an AI model and provide weather information for various locations.

## Project Structure

- `index.js`: Main entry point of the application. Contains the logic for interacting with the AI model and handling user queries.
- `ollama.js`: Contains an example of how to interact with the `ollama` library to get weather information.
- `transformer.js`: Demonstrates how to use the `AutoTokenizer` from the `@xenova/transformers` library.
- `package.json`: Contains the project metadata and dependencies.
- `.gitignore`: Specifies files and directories to be ignored by Git.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd weather_ai_agent
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To start the application, run the following command:
```sh
node index.js
```

## Example

To get weather information, you can use the following prompt:
```sh
"What's the weather like in New York?" 
```

This will return the current weather information for New York.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

