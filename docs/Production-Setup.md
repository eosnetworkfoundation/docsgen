# Production setup

The scripts will deploy to a production hosts when the `-h host` and `-i identity` file are provided. Adding these two parameters runs the deployment scripts. The deployment script does three things
- Backups the existing content on the remote host
- Creates a tar of the updated content
- Copies and installs updated content on the remote host

## Install Paths

The installation paths are fixed. These paths can only be changed in the code. The staging path is set when you provide the `-s` flag to `generate_documents.sh`

- production - `/var/www/html/ENF/production`
- staging - `/var/www/html/ENF/devrel_staging`

## Webserver Setup

You'll need to bring your own webserver to serve this content. That means you'll need two separate docroots matching the directories above. One docroot for production. One docroot for staging.

## Content Directory

The content directory is configurable with the `-c` option. The content directory stores the tar files for both the backups and the updates. By default content is `~/content`

### Backups
On the remote host the static content from [Install Paths](Production-Setup.md#install-paths) is tar'd up give a date time stamp and placed in the `content` directory.

### Tar Up New Content
On the local host the static content from `build_root/devdocs/build` is tar'd up, given a date time stamp and placed in the `content` directory.

### Update Content
The new content, as a tar archive, is copied over from local host to remote host using `sftp`. Then moved into the `content` directory. From there the old content is deleted, and replaced by the new content. The content is placed in the [Install Path](Production-Setup.md#install-paths).
