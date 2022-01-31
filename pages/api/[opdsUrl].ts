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

  const xmlDom = new xmldom.DOMParser().parseFromString(xml);
  if (!xmlDom || !xmlDom.documentElement) {
    return res.status(500).json({ error: "Failed to instantiate XML Parser." });
  }
  const isEntry = xmlDom.documentElement.localName === "entry";

  const result = isEntry ? entryToPub(xmlDom) : feedToFeed(xmlDom);
  return res.status(200).json(result);
}

function entryToPub(xml: Document): OPDSPublication {
  const opds1Entry = XML.deserialize<Entry>(xml, Entry);
  return convertOpds1ToOpds2_EntryToPublication(opds1Entry);
}

function feedToFeed(xml: Document): OPDSFeed {
  const opds1Feed = XML.deserialize<OPDS>(xml, OPDS);
  return convertOpds1ToOpds2(opds1Feed);
}
