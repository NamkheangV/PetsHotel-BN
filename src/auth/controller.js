import service from "./service.js";

const secret_key = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await service.findOne(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect!" });
    }

    const token = jwt.sign({ user_id: user.user_id }, secret_key, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const auth = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, secret_key, { maxAge: "7d" });
    const user = await service.findOne({ user_id: decoded.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: err.message });
  }
};

export { login, auth };
