import {
  convertOpds1ToOpds2_EntryToPublication,
  convertOpds1ToOpds2,
} from "r2-opds-js/dist/es8-es2017/src/opds/converter";
import xmldom from "xmldom";
import { OPDS } from "r2-opds-js/dist/es8-es2017/src/opds/opds1/opds";
import { Entry } from "r2-opds-js/dist/es8-es2017/src/opds/opds1/opds-entry";
import { OPDSFeed } from "r2-opds-js/dist/es8-es2017/src/opds/opds2/opds2";
import { OPDSPublication } from "r2-opds-js/dist/es8-es2017/src/opds/opds2/opds2-publication";
import { XML } from "r2-utils-js/dist/es8-es2017/src/_utils/xml-js-mapper";

export default function convert(xml: string): OPDSPublication | OPDSFeed {
  const xmlDom = new xmldom.DOMParser().parseFromString(xml);
  if (!xmlDom || !xmlDom.documentElement) {
    throw new Error("Failed to instantiate XML Parser.");
  }
  const isEntry = xmlDom.documentElement.localName === "entry";
  return isEntry ? entryToPub(xmlDom) : feedToFeed(xmlDom);
}

function entryToPub(xml: Document): OPDSPublication {
  const opds1Entry = XML.deserialize<Entry>(xml, Entry);
  return convertOpds1ToOpds2_EntryToPublication(opds1Entry);
}

function feedToFeed(xml: Document): OPDSFeed {
  const opds1Feed = XML.deserialize<OPDS>(xml, OPDS);
  return convertOpds1ToOpds2(opds1Feed);
}
