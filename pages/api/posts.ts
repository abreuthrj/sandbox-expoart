// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios, { AxiosRequestConfig } from "axios";
import { ApiPostType } from "store/api/types";
import { URLSearchParams } from "url";

const cmsToken =
  "99d78724a7b3e8daffd1cee5f809815b0fc89794141973c09e1720cc7a2ef7e671189f41e7b89954f819ab28e7a18d3e489966fedfffa378fafbd075ba28dab168d16a542b65610eeadb02123a2b53afd6c4c4dd57ee44444564debfcc54af90794554ba77fd9bd3cdcfb0dc193afa92257ef7f9cdacdef99b421a51567c6b06";

const cmsConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${cmsToken}`,
  },
};

export default async function handler(req, res) {
  let response: ApiPostType[] = [];

  try {
    const query = new URLSearchParams({
      populate: ["account", "user-post"],
      sort: "id:desc",
    });

    const cmsResponse = await axios.get(
      `/posts?${query.toString()}`,
      cmsConfig
    );

    console.log(cmsResponse.data.data);

    cmsResponse.data.data.map((post) => {
      response.push({
        title: post.attributes.title,
        date: post.attributes.createdAt,
        user: post.attributes.account.data.attributes.name,
        liked: false,
        likes: 0,
        views: 0,
        id: post.id,
      });
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(response);
}
