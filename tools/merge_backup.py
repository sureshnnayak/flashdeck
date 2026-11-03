#!/usr/bin/env python3
"""Merge a FlashDeck backup (Export backup in the app) into my-deck.json.

Usage: python3 tools/merge_backup.py path/to/flashdeck-backup-YYYY-MM-DD.json

- Cards, sections and categories are matched by id; the backup's version wins.
- Ratings from the backup overwrite the stored ones.
- Anything listed in the backup's "deleted" is removed from my-deck.json and hidden on every device.
"""
import json, sys, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
deck_path = root / "my-deck.json"
deck = json.loads(deck_path.read_text()) if deck_path.exists() else {}
backup = json.loads(pathlib.Path(sys.argv[1]).read_text())

deleted = set(backup.get("deleted", []))
summary = {}
for key in ("sections", "cats", "custom"):
    merged = {x["id"]: x for x in deck.get(key, [])}
    before = len(merged)
    for x in backup.get(key, []):
        merged[x["id"]] = x
    for i in deleted:
        merged.pop(i, None)
    deck[key] = list(merged.values())
    summary[key] = (before, len(deck[key]))

ratings = dict(deck.get("ratings", {}))
ratings.update(backup.get("ratings", {}))
for i in deleted:
    ratings.pop(i, None)
deck["ratings"] = ratings
# The latest backup decides what is deleted (including hidden built-in jokes).
deck["deleted"] = sorted(deleted)

deck_path.write_text(json.dumps(deck, ensure_ascii=False, indent=1) + "\n")
for key, (a, b) in summary.items():
    print(f"{key}: {a} -> {b}")
print(f"ratings: {len(ratings)}")
