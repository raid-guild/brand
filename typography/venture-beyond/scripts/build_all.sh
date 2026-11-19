#!/bin/sh
# One-shot: environment, upstream check, builds, validation, specimen.
#   sh scripts/build_all.sh        (~5 min; validate_variable.py samples 67 design-space locations)
set -eu
cd "$(dirname "$0")/.."
if [ ! -x .venv/bin/python ]; then
  if command -v uv >/dev/null 2>&1; then
    uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python -r scripts/requirements.txt
  else
    python3 -m venv .venv && .venv/bin/pip install -r scripts/requirements.txt
  fi
fi
.venv/bin/python scripts/fetch_upstream.py

# Approved v0.100 Extended Black baseline (hash-pinned; must not change)
.venv/bin/python scripts/build_prototype.py
.venv/bin/python scripts/validate.py > /dev/null \
  && echo "baseline: $(tail -n 1 baseline/extended-black-0.100/validation-report.txt)" \
  || { cat baseline/extended-black-0.100/validation-report.txt; exit 1; }

# Variable family -> dist/
.venv/bin/python scripts/build_variable.py
.venv/bin/python scripts/validate_variable.py > /dev/null \
  && echo "variable: $(tail -n 1 dist/validation-report.txt)" \
  || { cat dist/validation-report.txt; exit 1; }

.venv/bin/python scripts/make_specimen.py

# Checksums for the deliverables
(cd dist && shasum -a 256 ttf/* woff2/* > SHA256SUMS) && echo "wrote dist/SHA256SUMS"
