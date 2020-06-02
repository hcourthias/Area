import { AuthSession } from "expo";
import URLSearchParams from "@ungap/url-search-params";

import request from "./request";

function getRequestToken(tokens, callbackUrl, accessType) {
  const method = "POST";
  const url = "https://api.twitter.com/oauth/request_token";
  const body = accessType ? { x_auth_access_type: accessType } : {};

  return request(tokens, url, { method, body }, { oauth_callback: callbackUrl })
    .then(response => response.text())
    .then(text => {
      const params = new URLSearchParams(text);
      return {
        requestToken: params.get("oauth_token"),
        requestTokenSecret: params.get("oauth_token_secret")
      };
    });
}

function getAccessToken(
  { consumerKey, consumerSecret, requestToken, requestTokenSecret },
  oauthVerifier
) {
  const method = "POST";
  const url = "https://api.twitter.com/oauth/access_token";
  return request(
    {
      consumerKey,
      consumerSecret,
      oauthToken: requestToken,
      oauthTokenSecret: requestTokenSecret
    },
    url,
    { method },
    { oauth_verifier: oauthVerifier }
  )
    .then(response => response.text())
    .then(text => {
      const params = new URLSearchParams(text);
      return {
        accessToken: params.get("oauth_token"),
        accessTokenSecret: params.get("oauth_token_secret"),
        id: params.get("user_id"),
        name: params.get("screen_name")
      };
    });
}

export default async function auth(tokens, callbackUrl, { accessType } = {}) {
  const { requestToken, requestTokenSecret } = await getRequestToken(
    tokens,
    callbackUrl,
    accessType
  );
  AuthSession.startAsync({
    authUrl: `https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`
  }).then(async result => {
    const a = await getAccessToken(
      {
        consumerKey: tokens.consumerKey,
        consumerSecret: tokens.consumerSecret,
        requestToken,
        requestTokenSecret
      },
      result.params.oauth_verifier
    );
    console.log(a);
    return a;
  });
}
