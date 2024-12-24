import React from "react";
import AccountContext from "./AccountContext";
import UserPool from "./UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

const AccountState = (props) => {

    const signup = async (eamil, name, password) => {
        return await new Promise ((resolve, reject) => {
            var attributeList = [];
            var userName = {
                Name: "name",
                Value: name
            }
            attributeList.push(userName);

            UserPool.signUp(eamil, password, attributeList, null, (err, data)=>{
                if (err) {
                    console.log("Failed to register", err.message)
                    reject();
                }
                else {
                    console.log("Account created successfully", data);
                    resolve();
                }
            })
        })
    }

    const authenticate = async (Username, Password) => {
        return await new Promise ((resolve, reject) => {
            const user = new CognitoUser ({
                Username,
                Pool: UserPool
            })

            const authDetails = new AuthenticationDetails({
                Username,
                Password
            })

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("Login Success", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.log("Failure", err.message);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("New Password required", data);
                    resolve(data);
                }
            })
        })
    }

    return (
        <AccountContext.Provider value={{signup, authenticate}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState