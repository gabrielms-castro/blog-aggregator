# blog-aggregator
CLI tool that allows users to add RSS feeds, stores it and view summaries of aggregated feeds
### Installation
Install nvm and npm packages
```sh
nvm install
nvm use
npm install
```

### 1. Create a `.gatorconfig.json`file at home directory

```sh
# Linux
nano ~/.gatorconfig.json
```

It must contain the following keys: 
```json
{
  "db_url": "...",
  "current_user_name": "..."
}
```

### 2. Install and configure PostgreSQL
```sh
sudo apt update
sudo apt install postgresql postgresql-contrib
```
Update Postgres password
```sh
sudo passwd postgres
```
Start Postgres server in the background
```sh
sudo service postgresql start
```
Enter the `psql`shell with `sudo -u postgres psql`and create a database
```sh
CREATE DATABASE gator;
```
Connect to your database with `\c gator`

Set the user password
```sh
ALTER USER postgres PASSWORD 'postgres';
```
Set the connection string in the `.gatorconfig.json`. You'll need to disable SSL to use it with Drizzle
```json
{
  "db_url": "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
  "current_user_name": "..."
}
```

With all set, you'll be able to `generate`and `migrate` the DB
```sh
npm run generate
npm run migrate
```
Now try to register a user
```sh
npm run start register john
```
If everythig is allright, `current_user_name` in the `.gatorconfig.json` is now set
```sh 
cat ~/.gatorconfig.json
```

