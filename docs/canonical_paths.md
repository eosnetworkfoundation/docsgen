# Cononical Paths

Using apache rewrite rules change URLs on the fly to provide a consistent name for an file or action.

Instructions are Unbuntu specific.

## Add the Rules
Update Apache config change the following file `/etc/apache2/sites-enabled/000-default.conf`

Add the following under `<Directory "/var/www/htdocs">`

`<Directory "/var/www/htdocs">
    RewriteEngine on
    RewriteRule "^action-reference/eosio.bios$"  "/reference/mandel-contracts/classeosiobios_1_1bios.html"
    RewriteRule "^action-reference/eosio.system$" "/reference/mandel-contracts/classeosiosystem_1_1system__contract.html"
    RewriteRule "^action-reference/eosio.msig$" "/reference/mandel-contracts/classeosio_1_1multisig.html"
    RewriteRule "^action-reference/eosio.token$" "/reference/mandel-contracts/classeosio_1_1token.html"
    RewriteRule "^action-reference/eosio.wrap$" "/reference/mandel-contracts/classeosio_1_1wrap.html"
</Directory>`

## Enable Mod Rewrite
Check the config
```
sudo apachectl configtest
```
If it says, then need to add Mod Rewrite
`AH00526: Syntax error on line 35 of /etc/apache2/sites-enabled/000-default.conf:
Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration
Action 'configtest' failed.
The Apache error log may have more information.`

Here is how you add mod rewrite
```
cd /etc/apache2
sudo mv mods-available/rewrite.load mods-enabled/
```

## Fix Relative Paths

shell command to create linked directory so relative path CSS and images work
```
sudo ln -s /var/www/html/reference/mandel-contracts /var/www/html/action-reference
```
