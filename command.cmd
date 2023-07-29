To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
To start backend run pipenv run flask run
To start frontend cd into react-app then run npm start

To migrate/seed tables run:
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask seed all

For Github help:
Here are the steps for working on different feature branches.
Branch off of dev and merge with dev before merging to main.
Steps:
1. git checkout -b “featurebranch name”
2. Work on features on your feature branch
3. git add .
4. git commit -m “blah”
5. git pull origin dev
6. fix merge conflict if any, add and commit those changes if need be
7. git push origin <featurebranch name>

8. on github, create pull request(merge) from featurebranch to dev
