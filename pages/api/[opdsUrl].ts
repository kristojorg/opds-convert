import xmldom from "xmldom";
import { XML } from "r2-utils-js/dist/es8-es2017/src/_utils/xml-js-mapper";
import { OPDS } from "r2-opds-js/dist/es8-es2017/src/opds/opds1/opds";
import { Entry } from "r2-opds-js/dist/es8-es2017/src/opds/opds1/opds-entry";
import { OPDSFeed } from "r2-opds-js/dist/es8-es2017/src/opds/opds2/opds2";
import { OPDSPublication } from "r2-opds-js/dist/es8-es2017/src/opds/opds2/opds2-publication";
import {
  convertOpds1ToOpds2,
  convertOpds1ToOpds2_EntryToPublication,
} from "r2-opds-js/dist/es8-es2017/src/opds/converter";
import { NextApiRequest, NextApiResponse } from "next";
import convert from "lib/convert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const opdsUrl = req.query.opdsUrl as string | undefined;
  if (!opdsUrl) {
    res.status(400).json({ error: "Missing opdsUrl" });
  }

  // get the opds document
  const response = await fetch(opdsUrl);
  if (!response.ok) {
    return response;
  }

  const xml = await response.text();
  const result = convert(xml);
  res.status(200).json(result);
}
