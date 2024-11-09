# service_replacer_ui5
Replace service urls and prefix before build (ui5 projects)

## Configuration

These parameters can be provided as a options in ui5.yaml configuration or be stored as a env. varibles (file `.env` - (EXAMPLE))

  - `string` {array} - array of objects [{from: '', to: ''}]

## Usage

  package.json - add as dependency

  ```json
  "devDependencies": {
      // ...
      "ui5-task-replacer": "*"
      // ...
  },
  "ui5": {
    "dependencies": [
      // ...
      "ui5-task-replacer",
      // ...
    ]
  }
  ```

  ui5.yaml - add configuration

  ```yaml
  builder:
    customTasks:
    - name: ui5-task-replacer
      beforeTask: replaceCopyright
      configuration:
        string:
            - from: ''
              to: ''
            - from: ''
              to: ''
  ```
