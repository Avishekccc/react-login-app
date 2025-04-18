import { readSpecificWebUserService } from "../service/webUserService.js";

const authorized = (role) => {
  // roles = ["admin", "superadmin"]
  return async (req, res, next) => {
      let id = req.id;
    //   console.log(id)

    let result = await readSpecificWebUserService(id);
    let tokenRole = result.role;

    if (role.includes(tokenRole)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "user not authorized.",
      });
    }
  };
};

export default authorized