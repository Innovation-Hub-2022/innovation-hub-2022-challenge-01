import {CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute} from "amazon-cognito-identity-js";
import AWS from 'aws-sdk';

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: "eu-west-2",
    accessKeyId: 'AKIAWMQ6GGFRMBMRMZ4S', 
    secretAccessKey: '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'
});

export const UserPool = new CognitoUserPool({
    UserPoolId: 'eu-west-2_bAGNkXnPw',
    ClientId: '7slijkpalrrthobi9cco5fsde8'
  });

export const ListUsers = (callback) => 
{
    var params = {
        UserPoolId: 'eu-west-2_bAGNkXnPw',
        AttributesToGet: [
            "name",
            "zoneinfo",
            "address",
            "email"
            /* more items */
        ],
    };
    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {            
            callback(data.Users);
        }
    });

};

export const AuthenticateUser = (user, callback) =>
{
    var cognitoUser = new CognitoUser(
    {
        Username: user.name,
        Pool: UserPool,
    });

    var authenticationDetails = new AuthenticationDetails(
    {
        Username: user.name,
        Password: user.password,
    });

    const authenticateUser_mfaSetup = (challengeName, challengeParameters) =>
    {
        console.log(challengeName);
        console.log(challengeParameters);
        cognitoUser.associateSoftwareToken(this);
    }
    
    const authenticateUser_associateSecretCode = (secretCode) =>
    {
        console.log(secretCode);
        var challengeAnswer = prompt('Please input the TOTP code.', '');
        cognitoUser.verifySoftwareToken(challengeAnswer, 'My TOTP device', this);
    }

    const authenticateUser_onSuccess = (result) =>
    {
        //            debugger; // eslint-disable-line no-debugger
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);
                      
        cognitoUser.getUserAttributes((err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            for (var i = 0; i < result.length; i++) {
                console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
            }
        });
        callback();
    }

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => authenticateUser_onSuccess(result),
        onFailure: (err) => alert(err.message || JSON.stringify(err)),
        mfaSetup: (challengeName, challengeParameters) => authenticateUser_mfaSetup(challengeName, challengeParameters),
        associateSecretCode: (secretCode) => authenticateUser_associateSecretCode(secretCode),

            selectMFAType: function(challengeName, challengeParameters) {
                console.log(challengeName);
                console.log(challengeParameters);                    
                var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
                cognitoUser.sendMFASelectionAnswer(mfaType, this);
            },

            totpRequired: function(secretCode) {
                console.log(secretCode);
                var challengeAnswer = prompt('Please input the TOTP code.', '');
                cognitoUser.sendMFACode(challengeAnswer, this, 'SOFTWARE_TOKEN_MFA');
            },

            mfaRequired: function(codeDeliveryDetails) {
                console.log(codeDeliveryDetails);
                var verificationCode = prompt('Please input verification code', '');
                cognitoUser.sendMFACode(verificationCode, this);
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                console.log(requiredAttributes);

                //debugger; // eslint-disable-line no-debugger
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                delete userAttributes.email;   
                userAttributes.zoneinfo |= "eu-west-2";
                userAttributes.gender |= " ";
                userAttributes.locale |= " ";
                userAttributes.address |= " ";
                userAttributes.name |= " ";

                console.log(userAttributes);
                cognitoUser.completeNewPasswordChallenge(user.newPassword, userAttributes, this); 
            }
        }
    ); 
}

export const SignUpUser = (user, callback) =>
{
    var attributeList = [
        new CognitoUserAttribute({Name:'name', Value: user.name || ' '}),
        new CognitoUserAttribute({Name:'email', Value: user.email || ' '}),
        new CognitoUserAttribute({Name:'gender', Value: user.gender || ' '}),
        new CognitoUserAttribute({Name:'zoneinfo', Value: user.zoneinfo || ' '}),
        new CognitoUserAttribute({Name:'locale', Value: user.locale || ' '}),
        new CognitoUserAttribute({Name:'address', Value: user.address || ' '})
    ];
    debugger; // eslint-disable-line no-debugger
    UserPool.signUp(user.name, user.password, attributeList, null, 
        function(err,result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            callback();
        }
    );
}