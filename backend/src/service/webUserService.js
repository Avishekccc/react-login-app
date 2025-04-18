import { WebUser } from "../schema/model.js";

export const creatWebUserService = async (data) => {
  return await WebUser.create(data);
};

export const loginWebUserService = async (email) => {
  return await WebUser.findOne({ email: email }); // we can also write only email also
};

export const deleteSpecificWebUserService = async (id) => {
  return await WebUser.findByIdAndDelete(id);
};

export const updateWebUserService = async (userId) => {
  return await WebUser.findByIdAndUpdate(
    userId,
    {
      isVerifiedEmail: true,
    },
    { new: true }
  );
};

export const updateMyProfileWebUsersrvice = async (id ,data) => {
  return await WebUser.findByIdAndUpdate(id , data,{new:true})
}

export const updatePasswordWebUsersrvice = async (
  id,
  { password: newHashPassword }
) => {
  return await WebUser.findByIdAndUpdate(
    id,
    { password: newHashPassword },
    { new: true }
  );
};

export const deleteWebUserService = async (id) => {
  return await WebUser.findByIdAndDelete(id);
};

export const readAllWebUserService = async () => {
  return await WebUser.find({});
};

export const readSpecificWebUserService = async (id) => {
  return await WebUser.findById(id);
};

export const updateSpecificWebUserService = async (id, data) => {
  return await WebUser.findByIdAndUpdate(id, data, { new: true });
};


export const forgotPasswordWebUserService = async (email) => {
  return await WebUser.findOne({email:email})
}


export const resetPasswordWebUserService = async (id ,{password:hashPassword}) => {
  return await WebUser.findByIdAndUpdate(id, { password: hashPassword }, {new:true});
}


