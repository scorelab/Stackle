// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:3000',
  AUTH0_CLIENTID: 'f6ewsNvcnhe8ODntv_FAD_lW_YPvxN5X',
  AUTH0_DOMAIN: 'psnmissaka.au.auth0.com',
  AUTH0_AUDIENCE: 'https://psnmissaka.au.auth0.com/userinfo',
  AUTH0_REDIRECTURI: 'http://localhost:4200/app/commonFeed'
};
