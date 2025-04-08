const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/UserDetails");

const JWT_SECRET =
  "xkndemecnjcekrce_nkcjencvke_+03e3e33d3dn_jkd2opdeeded22322389298e28er20[]nd";

exports.register = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ status: "failure", data: "user already exists" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name: name,
      email: email,
      mobile,
      password: encryptedPassword,
    });
    res.send({ status: "ok", data: "user created" });
  } catch (ex) {}
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.send({ data: "user doesn't exist", status: "ok", code: 202 });
  }

  if (await bcrypt.compare(password, existingUser?.password)) {
    const token = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      JWT_SECRET
    );

    if (res.status(201)) {
      return res.send({
        status: "ok",
        data: {
          email: existingUser.email,
          mobile: existingUser.mobile,
          name: existingUser.name,
          token: token,
        },
      });
    } else {
      return res.send({ error: "error" });
    }
  } else {
    return res.send({
      error: "error",
      data: "incorrect password",
      code: 403,
    });
  }
};

exports.userDetails = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const userEmail = user.email;
      User.findOne({ email: userEmail })
        .populate({
          path: "orders",
          populate: {
            path: "restaurant",
            select: "name image",
          },
        })
        .then((data) => {
          return res.send({ status: "ok", data: data });
        });
    } catch (error) {}
  } else {
    return res.send({ status: "failure", data: "no token present" });
  }
};

exports.updateUser = async (req, res) => {
  const { image, name, token } = req.body;
  if (token) {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      console.log("user", user);
      const userId = user._id;
      let dataToUpdate = {};
      if (image) {
        dataToUpdate.image = image;
      }
      if (name) {
        dataToUpdate.name = name;
      }
      const updateResult = await User.updateOne(
        { _id: userId },
        { $set: dataToUpdate }
      );
      if (updateResult.matchedCount === 0) {
        return res.send({ status: "failure", data: "user not found" });
      }
      res.send({ status: "ok", data: "updated" });
    } catch (error) {
      res.send({ error: error });
    }
  } else {
    return res.send({ status: "failure", data: "no token present" });
  }
};
