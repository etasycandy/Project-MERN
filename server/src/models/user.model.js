let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let { toJSON, paginate } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    roles: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Add plugin that converts mongoose to json
 */
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
