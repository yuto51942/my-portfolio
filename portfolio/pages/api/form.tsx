import { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios'

interface Text {
  name: string,
  title: string,
  mail: string,
  text: string,
  date: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 500
  if (req.method === 'POST'){
    const getData: Text = req.body
    sendDiscord(getData)
    status = 200
  }

  res.setHeader("content-type", "application/json")
  res.status(status)
  res.end()
}

async function sendDiscord(data: Text){
  const token = process.env.DISCORD_TOKEN

  const text = `【新着問い合わせ】
* お名前: ${data.name}
* メールアドレス: ${data.mail}
* 送信日時: ${data.date}
* 内容
${data.text}
  `

  console.log(text)
  console.log(token)

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
  }

  const postData = {
    content: text
  }

  axios.post(token, postData, config)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })

}

