# Inline Body

[[info]] | This is an inline body section.

[[info]] | this is another inline body section.
Don't put me in admonition!!

# Body With Pipes

[[info | Some other parameters that you can use to restart nodeos are:]]
| - --truncate-at-block | - --delete-all-blocks | - --replay-blockchain | - --hard-replay-blockchain

[[info | The genesis node is defined by the following:]]
| - Bears the name `eosio`
| - Produces blocks
| - Listens for HTTP request on 127.0.0.1:8888
| - Listens for peer connections requests on 127.0.0.1:9010
| - Initiates periodic peer connections to localhost:9011, localhost:9012, and localhost:9013; these nodes do not run yet so ignore if you see any failed connection attempts
| - Has the parameter `--contracts-console` which prints contracts output to the console; in our case, this information is good for troubleshooting problems

# Inline Body with Pipes

[[info | Accounts and Tokens]] | - For commands on creating new accounts, see How to create an account on the Getting Started section. | - To issue, allocate, and transfer tokens between accounts, see the Deploy, Issue and Transfer Tokens on the Getting Started section.

# End File with Admonition
[[note | Print Me]]
