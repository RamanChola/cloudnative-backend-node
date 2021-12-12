const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).json(err);
  }
  if (existingUser) {
    return res.status(422).json("User exists already, please login instead");
  }
  let EncPass;
  try {
    EncPass = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
  }
  const createdUser = new User({
    username,
    email,
    password: EncPass,
  });
  try {
    await createdUser.save();
  } catch (err) {
    res.status(500).json(err);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
      },
      "supera"
    );
  } catch (error) {
    res.status(500).json(`its me${err}`);
  }
  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    token: token,
  });
};
const login = async (req, res) => {
	let existingUser;
	try {
		existingUser = await User.findOne({ email: req.body.email });
		if (!existingUser) {
			return res.status(400).json("wrong credentials");
		}

		const validated = await bcrypt.compare(
			req.body.password,
			existingUser.password
		);
		if (!validated) {
			return res.status(400).json("wrong credentials");
		}

    let token;
    try {
      token = jwt.sign(
        {
          userId: existingUser.id,
        },
        "supera"
      );
    } catch (error) {
      res.status(500).json(error);
    }
    res.json({
      userId: existingUser.id,
      username: existingUser.username,
      token: token,
    });
  } catch (err) {
    res.status(500).json(`its me${err}`);
  }
};

exports.signup = signup;
exports.login = login;
