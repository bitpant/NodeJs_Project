url is in format http://localhost:5050/api/roles/createRole/:userId
url is in format http://localhost:5050/api/user/:userId
url is in format http://localhost:5050/api/search/:userId

userId of user which is performing the operation is sent with every url which is used to check if this user has permission to perform this operation or not .Middleware is used to perform this validation.



post Role create http://localhost:5050/api/roles/createRole/5d9df462ea940061485951b4

{
"RoleName": "Operator",
"createdby":"Administrator"
}

get All Roles: http://localhost:5050/api/roles/getRoles

 {
        "isPublished": true,
        "_id": "5d9eddf2aa7ae5587c31ecc9",
        "RoleId": 2,
        "RoleName": "Operator",
        "date": "2019-10-10T07:29:54.930Z",
        "__v": 0
    }
	
getRole by id: http://localhost:5050/api/roles/5d9df462ea940061485951b4/5d9eddf2aa7ae5587c31ecc9

delete: http://localhost:5050/api/roles/5d9df462ea940061485951b4/5d9dd2d647b0f022c0c60600

put methods: http://localhost:5050/api/roles/5d9df462ea940061485951b4/5d9dd5d698bf4f7cc47a5e5d

http://localhost:5050/api/users/createUser/5d9df4a0ea940061485951b5 post

http://localhost:5050/api/users/5d9df462ea940061485951b4 put

http://localhost:5050/api/person/getPersons/5d9df4a0ea940061485951b5  get

http://localhost:5050/api/person/5d9df462ea940061485951b4/5d9dfec72cc42b7968067f28 delete put get

http://localhost:5050/api/person/5d9f3db6c675977f7c04fc35/5d9f24bbab4f1f85c8e2575e

http://localhost:5050/api/person/getPerson/5d9ec8994a2c2663208f7770/5da00915980d16521c81515b  get

http://localhost:5050/api/search/5d9df4a0ea940061485951b5 search/

{
    "fullName": {
        "firstName": "Ujjwal chu",
        "middleName": "Kumar",
        "lastName": "Pant"
    },
    "address": {
        "flatNumber": "Baner",
        "societyName": "kalawati coloney",
        "streetName": "nawabi road"
    },
    "isPublished": true,
    "_id": "5d9f24bbab4f1f85c8e2575e",
    "gender": "Male",
    "dob": "1994-06-01T00:00:00.000Z",
    "age": 52,
    "city": "Haldwani",
    "state": "Uttarakhand",
    "pincode": 263139,
    "mobileNumber": 7409354125,
    "maritalStatus": "Unmarried",
    "educationStatus": "B.tech",
    "birthSign": "Mole on forehead",
    "userId": "5d9df462ea940061485951b4",
    "__v": 0,
    "PersonUniqueueId": 14,
    "physicalDisability": null
}