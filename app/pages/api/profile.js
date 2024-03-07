
export const db = {
  username: "Tomichou",
  email: "tomtom@queen.slay"
}

export default function handler(req, res) {
  res.status(200).json(db)
}
