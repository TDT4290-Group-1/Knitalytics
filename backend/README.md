# [Knitalytics](../README.md) > Backend

This folder is for the Knitalytics backend. Implemented using Flask. Endpoints are outlined [here](./ENDPOINTS.md).

## Getting Started

#### Mac:
```bash
$ python3 -m venv venv
$ source venv/bin/activate
$ pip3 install -r requirements.txt
```

#### Windows:
```bash
$ python3 -m venv venv
$ venv\Scripts\activate
$ pip3 install -r requirements.txt
```

Sets up Python environment and installs Python modules and packages listed in the [requirements file](https://github.com/dream-knit/knitalytics/blob/153-update-documentations/backend/requirements.txt).


## Starting App
#### Mac:
```bash
$ source venv/bin/activate
$ python3 -m flask run
```
#### Windows:
```bash
$ venv\bin\activate
$ python3 -m flask run
```

This will launch the app at [http://localhost:5000](http://localhost:5000).


## Run tests

```bash
$ python3 -m pytest
```

This will execute all tests in all files whose names follow the form test\_\*.py or \*\_test.py in the current directory and its subdirectories.

### View test coverage

```bash
$ python3 -m coverage run -m pytest
$ python3 -m coverage report
```

```bash
$ python3 -m coverage html
```
Will generate html file that shows the test coverage

## Fix Formatting

```bash
$ black ./ --check
```
Checks if correct formatting is used in the code

```bash
$ black ./
```
Fixes formatting errors

## Further Reading

- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [Flask testing with pytest](https://flask.palletsprojects.com/en/2.2.x/testing/)
- [Pytest](https://docs.pytest.org/en/7.1.x/)
