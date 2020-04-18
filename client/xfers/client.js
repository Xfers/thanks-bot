
import fetch from 'node-fetch'
import {xfers_api_key, xfers_env} from '../../constants.js'

const BASE_URL = xfers_env == "production" ? "https://www.xfers.io/api" : "https://sandbox.xfers.io/api"

export async function get_bot_status() {
  const result = await fetch(`${BASE_URL}/v3/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-XFERS-USER-API-KEY': xfers_api_key
      },
  })
  return result
}


