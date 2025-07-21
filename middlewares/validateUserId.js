export default function validateUserId(req, res, next) {
  const userId = req.params.userId || req.body.userId;
  if (!userId) {
    return res.status(422).json({ error: "Required → at userId" });
  }

  // Muss hier geprüft werden, ob die ID wie eine MongoDB ObjectID aussieht
  if (!/^[a-f\d]{24}$/i.test(userId)) {
    return res.status(422).json({ error: "Invalid userId format" });
  }
  next();
}
