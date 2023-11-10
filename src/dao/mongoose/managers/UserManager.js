import userModel from '../models/usersModel.js'



export default class UserManager{
    get = () => {
        return userModel.find().lean();
    };
    getBy = (param) => {
        return userModel.findOne(param).lean();
    };
    create = (user) => {
        return userModel.create(user);
    };


}