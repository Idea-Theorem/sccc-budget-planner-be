import dotenv from "dotenv";

dotenv.config();

const variables = {
  jwt: {
    token: process.env.JWT_SECRET,
  },
};

export default variables;