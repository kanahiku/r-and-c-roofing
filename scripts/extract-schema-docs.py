#!/usr/bin/env python3
"""
extract-schema-docs.py

Extracts Schema.org JSON-LD blocks from client Word documents (.docx) in Batch 1–4,
deduplicates identical entity blocks, normalizes canonical URLs to https://www.roofinspectionhawaii.com,
and outputs a compiled customOverrides.json map.

Usage:
  python3 scripts/extract-schema-docs.py [schema_docs_dir]
"""

import sys
import glob
import os
import re
import json
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict

DEFAULT_DIR = "/Users/deepaksmac/Downloads/schema"
CANONICAL_DOMAIN = "https://www.roofinspectionhawaii.com"

def extract_doc_blocks(doc_path: str):
    with zipfile.ZipFile(doc_path) as z:
        xml_content = z.read("word/document.xml")
        root = ET.fromstring(xml_content)
        full_text = []
        for p in root.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
            p_text = "".join(t.text for t in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if t.text)
            full_text.append(p_text)
        content = "\n".join(full_text)

    # Split by "Block N:" or "Breadcrumb —"
    chunks = re.split(r"\n(?=(?:Block \d+:|Breadcrumb —))", content)
    items = []
    for c in chunks:
        c = c.strip()
        if not c:
            continue
        first_line = c.split("\n")[0].strip()
        if not (first_line.startswith("Block ") or first_line.startswith("Breadcrumb ")):
            continue
        url_m = re.search(r"Page URL:\s*([^\n\r]+)", c)
        url = url_m.group(1).strip() if url_m else None

        json_start = c.find("{")
        json_end = c.rfind("}")
        json_obj = None
        if json_start != -1 and json_end != -1 and json_end > json_start:
            raw_json = c[json_start:json_end + 1]
            try:
                json_obj = json.loads(raw_json)
            except Exception as e:
                print(f"JSON parse error in {first_line} ({doc_path}): {e}", file=sys.stderr)

        items.append({
            "header": first_line,
            "url": url,
            "json": json_obj,
            "source": os.path.basename(doc_path),
        })
    return items

def main():
    source_dir = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DIR
    doc_files = sorted(glob.glob(os.path.join(source_dir, "*.docx")))
    if not doc_files:
        print(f"No docx files found in {source_dir}", file=sys.stderr)
        sys.exit(1)

    print(f"Found {len(doc_files)} schema docx files in {source_dir}")

    url_nodes = defaultdict(list)
    seen = set()

    for doc in doc_files:
        items = extract_doc_blocks(doc)
        print(f"  Processed {os.path.basename(doc)}: {len(items)} items")
        for item in items:
            url = item["url"]
            j = item["json"]
            if not url or not j:
                continue

            path = url.replace(CANONICAL_DOMAIN, "").replace("https://roofinspectionhawaii.com", "")
            if not path:
                path = "/"
            if path != "/" and path.endswith("/"):
                path = path[:-1]

            nodes = j["@graph"] if "@graph" in j else [j]
            for n in nodes:
                n_clean = {k: v for k, v in n.items() if k != "@context"}
                sig = (path, n_clean.get("@type"), n_clean.get("name", ""), n_clean.get("@id", ""))
                if sig not in seen:
                    seen.add(sig)
                    url_nodes[path].append(n_clean)

    output_schemas = {}
    for path, nodes in sorted(url_nodes.items()):
        if len(nodes) == 1:
            single = dict(nodes[0])
            output_schemas[path] = {"@context": "https://schema.org", **single}
        else:
            output_schemas[path] = {
                "@context": "https://schema.org",
                "@graph": nodes,
            }

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    target_json = os.path.join(project_root, "src", "config", "schema", "customOverrides.json")

    with open(target_json, "w", encoding="utf-8") as f:
        json.dump(output_schemas, f, indent=2, ensure_ascii=False)

    print(f" Successfully exported {len(output_schemas)} route schemas to {target_json}")

if __name__ == "__main__":
    main()
