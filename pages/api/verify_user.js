import jwt from 'jsonwebtoken';
const KEY = 'your-secret-key'
export default function verify(req, res){
  if(req.method === 'POST'){
    const token = req.body.token;
    const verified = jwt.verify(token, KEY);
    if (verified) res.status(200).json({ success: true });
    else res.status(401).json({ success: false })
  }
  else res.status(500).json( {error: "Invalid method" })
}