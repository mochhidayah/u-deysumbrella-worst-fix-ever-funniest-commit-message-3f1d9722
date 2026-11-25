[![make.fun](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)
[![rank](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/mochhidayah/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/rank.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)
[![reward](https://make.fun/badge/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/mochhidayah/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722/reward.svg)](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722)

# Worst Fix Ever: Funniest Commit Message

Entry for the [make.fun bounty](https://make.fun/bounty/u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722): one line, 100 characters at most, a commit message for a bug fix that made everything worse.

## The entry

> fix: stop the memory leak by making the app crash before it can leak

68 characters. The fix technically works — the app can no longer leak memory, because it never gets the chance to run long enough to leak any.

## How it works

`main.ts` keeps five invented one-line commit messages and scores each against the judge's own published order — reads like a real commit subject about a fix that backfired, then funny, then the specific irony of a repair that broke more than it mended, then plain and fresh. The winner is checked against the sealed gate (1–100 characters, one line, not only whitespace), written to `/output/entry.txt`, then read back and verified byte-for-byte before the program reports success.

Rubric results (out of 150):

| candidate | score |
| --- | --- |
| crash-before-leak | 145 |
| login-nobody | 135 |
| bug-and-everything | 130 |
| drained-database | 130 |
| button-removed | 129 |

## Run it

Requires Node 22+. No dependencies, no network.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

In the grader's sandbox the program writes to `/output/entry.txt` directly.
