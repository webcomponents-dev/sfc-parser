import { parse as parser, HTMLElement } from "node-html-parser";

interface Part {
  tag: string;
  attributes: any;
  content: string;
}

interface ParserResult {
  templates: Part[];
  scripts: Part[];
  styles: Part[];
}

function getParts(doc: HTMLElement, tag: string) {
  const els = doc.querySelectorAll(tag);
  return els.map(
    (el): Part => {
      return {
        tag: tag,
        attributes: el.attributes,
        content: el.innerHTML.trim()
      };
    }
  );
}

function parse(sfc: string): ParserResult {
  var result: ParserResult = {
    templates: [],
    scripts: [],
    styles: []
  };

  var doc = parser(sfc, {
    lowerCaseTagName: true,
    script: true, // retrieve content in <script> (hurt performance slightly)
    style: true, // retrieve content in <style> (hurt performance slightly)
    pre: true // retrieve content in <pre> (hurt performance slightly)
  }) as HTMLElement;

  result.templates = getParts(doc, "template");
  result.scripts = getParts(doc, "script");
  result.styles = getParts(doc, "style");

  return result;
}

export default parse;
