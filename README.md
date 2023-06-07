## Beplus CLI
Beplus CLI helper tools for project resource

#### How to use 
```bash
npm i beplus-cli -g
```

#### Create a project-pack
```bash
$ be pp-init
or
$ be pp-init --name folder-name
```

#### Auth 
```bash
$ be auth <username> <password>
```

#### Logout 
```bash
$ be logout
```

#### sFTP
```bash
$ be sftp list              # get all
$ be sftp list <keywords>   # list by keywords  

$ be sftp add <name> <path_file_ftp_config>
# example: be sftp add "https://bearsthemes.com" ./sftp/config.json 

# Update
$ be sftp update <id> <name> <path_file_ftp_config>

# Delete
$ be sftp delete <id>

# Show
$ be sftp show <id>

# Put to file config
$ be sftp put <id> <path>
```