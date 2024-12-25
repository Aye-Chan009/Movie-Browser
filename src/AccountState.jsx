import React from "react";
import AccountContext from "./AccountContext";
import UserPool from "./UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

const AccountState = (props) => {

    const logout = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.signOut();
                localStorage.removeItem('loggedInUserName');
                resolve(user);
            } else {
                reject()
            }
        })
    }

    const getSession = async () => {
        return await new Promise ((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject(err);
                    } else {
                        //resolve(session);
                        const attributes = await new Promise ((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    console.log(err.message);
                                    reject(err);
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        const {Name, Value} = attribute;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                    console.log(results);
                                    localStorage.setItem('loggedInUserName', results.name);
                                }
                            })
                        })
                        resolve({user, ...session, ...attributes})
                    }
                })
            } else {
                reject();
            }
        })
    }

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
        <AccountContext.Provider value={{signup, authenticate, getSession, logout}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState