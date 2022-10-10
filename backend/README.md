# [Knitalytics](../README.md) > Backend

This folder is for the Knitalytics backend. Implemented using Flask. Endpoints are outlined [here](./ENDPOINTS.md).

## Getting Started

Set up environment

```bash
$ python3 -m venv venv
$ source venv/bin/activate
$ pip3 install -r requirements.txt
```

If running Windows use `venv\Scripts\activate` instead of `source venv/bin/activate`. Remember to apply migrations. If you do not apply migrations a warning will be displayed when starting the application.

## Starting App

```bash
$ source venv/bin/activate
$ python3 -m flask run
```

If running Windows use `venv\bin\activate` instead of `source venv/bin/activate`. Remember to activate

This will launch the app at [http://localhost:5000](http://localhost:5000).

<!--
## Migrations

To apply migrations run
```bash
$ python manage.py migrate
```

To create a superuser (Initial admin account) run
```bash
$ python manage.py createsuperuser
```
This account can be used to log in to the admin panel for the first time.

If you change or add a model, you have to make and apply migrations. You can do this using
```bash
$ python manage.py makemigrations
$ python manage.py migrate
```
-->

## Run tests

To run tests run

```bash
$ python3 -m pytest
```

This will execute all tests in all files whose names follow the form test\_\*.py or \*\_test.py in the current directory and its subdirectories.

### View test coverage

```bash
$ python3 -m coverage run -m pytest
$ python3 -m coverage report
```

To view test coverage in browser as html file:

```bash
$ python3 -m coverage html
```

## Fix Formatting

Check if formatting is correct using

```bash
$ black ./ --check
```

To fix any formatting errors run

```bash
$ black ./
```

## Further Reading

- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [Flask testing with pytest](https://flask.palletsprojects.com/en/2.2.x/testing/)
- [Pytest](https://docs.pytest.org/en/7.1.x/)
