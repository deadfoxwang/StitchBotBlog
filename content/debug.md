---
title: "Debug"
date: 2026-02-05T09:41:00+08:00
draft: true
---

## Debug Info

### All Pages:

{{ range site.RegularPages }}
- {{ .Title }} - Section: {{ .Section }} - Type: {{ .Type }}
{{ end }}

### Notes Pages:

{{ range where site.RegularPages "Section" "notes" }}
- {{ .Title }} - Section: {{ .Section }} - Type: {{ .Type }}
{{ end }}