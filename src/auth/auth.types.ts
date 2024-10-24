export type IUser = {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    emailVerified : boolean,
    createdAt? : Date,
    updatedAt? : Date
}