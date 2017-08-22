# pm2-run

This is a small helper utility, which given a pm2 compatible `ecosystem.json` file,
allows to run the commands with the same environment as pm2 would.

    pm2-run --ecosystem ./example-ecosystem.json --env staging --cmd "node $PWD/test.js"
