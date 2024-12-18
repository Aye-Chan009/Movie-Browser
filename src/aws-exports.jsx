// aws-exports.js
const awsconfig = {
  Auth: {
    // Your Cognito settings here
    region: 'ap-southeast-2',
    userPoolId: 'ap-southeast-2_J9eZfm3EW',
    userPoolWebClientId: 'hh6duq6qlhr2iv2igtldrdcc4',
    oauth: {
      domain: 'https://ap-southeast-2j9ezfm3ew.auth.ap-southeast-2.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:5173/', // Your app's URL
      redirectSignOut: 'http://localhost:5173/',
      responseType: 'code', // This can be 'token' or 'code'
    }
  }
};

export default awsconfig
  