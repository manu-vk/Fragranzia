// const userModel = require("../model/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExist = await userModel.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

// console.log(hashedPassword,"hashedPassword");

//     const user = await userModel.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const ismatch = await bcrypt.compare(password, user.password);
//     if (!ismatch) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1y" }
//     );

//     res.status(200).json({message: "Login successful",token,user});

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { registerUser, loginUser };