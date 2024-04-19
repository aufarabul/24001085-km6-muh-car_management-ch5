const jsonwebtoken = require("jsonwebtoken");
const {
  createMember,
  getMemberByEmail,
  getMemberById,
} = require("../../repository/member");
const bcrypt = require("bcrypt");

exports.register = async (payload) => {
  let member = await createMember(payload);

  // Delete object password from member
  delete member.dataValues.password;

  // Create token
  const jwtPayload = {
    id: member.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // return the member data and the token
  const data = {
    member,
    token,
  };

  return data;
};

exports.login = async (email, password) => {
  const member = await getMemberByEmail(email);

  if (!member) {
    throw new Error("member is not found");
  }

  const isPasswordValid = await bcrypt.compare(password, member?.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  if (member?.dataValues?.password) {
    delete member?.dataValues?.password;
  } else {
    delete member?.password;
  }

  const jwtPayload = {
    id: member.id,
  };
  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const data = {
    member,
    token,
  };
  return data;
};

exports.profile = async (id) => {
  // get the member
  let data = await getMemberById(id);
  if (!data) {
    throw new Error(`member is not found!`);
  }

  // delete password
  if (data?.dataValues?.password) {
    delete data?.dataValues?.password;
  } else {
    delete data?.password;
  }

  return data;
};
