import { z } from "zod/v4";
import ErrorResponse from "../utils/ErrorResponse.js";

const validate = (Schema) => (req, res, next) => {
  const { error } = Schema.safeParse(req.body);

  if (error) {
    const prettifiedErrors = z.prettifyError(error);
    throw new ErrorResponse(prettifiedErrors, 422);
  }

  next();
};

export default validate;
