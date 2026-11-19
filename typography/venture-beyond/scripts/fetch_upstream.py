"""Verify (default) or re-fetch (--fetch) the pinned Archivo upstream files.

    python scripts/fetch_upstream.py           # verify vendored files against pinned SHA-256
    python scripts/fetch_upstream.py --fetch   # clone the pinned commit, copy files, verify

The vendored copies in upstream/archivo/ are read-only and must never be edited.
"""

from __future__ import annotations

import hashlib
import shutil
import stat
import subprocess
import sys
import tempfile
from pathlib import Path

from vb_config import UPSTREAM_COMMIT, UPSTREAM_DIR, UPSTREAM_FILES, UPSTREAM_REPO


def sha256(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def verify() -> list[str]:
    errors = []
    for rel, want in UPSTREAM_FILES.items():
        p = UPSTREAM_DIR / Path(rel).name
        if not p.exists():
            errors.append(f"missing {p}")
        elif (got := sha256(p)) != want:
            errors.append(f"hash mismatch {p.name}: {got} != {want}")
    return errors


def fetch() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        repo = Path(tmp) / "archivo"
        subprocess.run(["git", "init", "-q", str(repo)], check=True)
        subprocess.run(["git", "-C", str(repo), "fetch", "-q", "--depth", "1", UPSTREAM_REPO, UPSTREAM_COMMIT], check=True)
        subprocess.run(["git", "-C", str(repo), "checkout", "-q", "FETCH_HEAD"], check=True)
        UPSTREAM_DIR.mkdir(parents=True, exist_ok=True)
        for rel in UPSTREAM_FILES:
            dst = UPSTREAM_DIR / Path(rel).name
            if dst.exists():
                dst.chmod(dst.stat().st_mode | stat.S_IWUSR)
            shutil.copyfile(repo / rel, dst)
            dst.chmod(0o444)


if __name__ == "__main__":
    if "--fetch" in sys.argv:
        fetch()
    errs = verify()
    for e in errs:
        print("FAIL", e)
    if errs:
        sys.exit(1)
    print(f"OK: {len(UPSTREAM_FILES)} upstream files match Omnibus-Type/Archivo@{UPSTREAM_COMMIT[:7]}")
