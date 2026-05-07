import User from "./users.schema.js"

export const getUserByIdService = async(_id: string)=>{
    const user = User.findById(_id);
    return user;
}