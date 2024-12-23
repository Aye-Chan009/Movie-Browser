import { CognitoUserPool } from "amazon-cognito-identity-js";

// Check for missing variables
const userPoolId = import.meta.env.VITE_POOL_ID;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;

if (!userPoolId || !clientId) {
  console.error("Error: Both VITE_POOL_ID and VITE_APP_CLIENT_ID are required.");
  throw new Error("Both VITE_POOL_ID and VITE_APP_CLIENT_ID are required.");
}

const PoolData = {
  UserPoolId: userPoolId,
  ClientId: clientId
};

export default new CognitoUserPool(PoolData);
