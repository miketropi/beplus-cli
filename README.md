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

#### Seach sFTP Config
```bash
$ be search-sftp              # get all
$ be search-sftp <keywords>   # serach by keywords
```

#### sFTP
```bash
$ be sftp add <name> <path_file_ftp_config>
example: be sftp add "https://bearsthemes.com" ./sftp/config.json 

$ be sftp update <id> <name> <path_file_ftp_config>

$ be sftp delete <id>

$ be sftp show <id>

$ be sftp put <id> <path>
```