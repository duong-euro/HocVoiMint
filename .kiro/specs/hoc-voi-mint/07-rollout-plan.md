# Rollout Plan

## 1. Release Strategy
Chosen strategy: Direct deploy to GitHub Pages (main branch)
Reason: Static site, no backend, no migration needed. Push = deploy.

## 2. Preconditions
- [x] GitHub repo created (duong-euro/HocVoiMint)
- [x] GitHub Pages enabled (Settings > Pages > main branch / root)
- [x] Code pushed to main branch
- [x] Font tiếng Việt verified
- [x] Quiz flow tested manually

## 3. Setup Instructions
```bash
# Clone repo
git clone https://github.com/duong-euro/HocVoiMint.git

# Mở trực tiếp trong browser
# Option 1: Double-click index.html
# Option 2: Live server
npx serve .

# Hoặc truy cập online
# https://duong-euro.github.io/HocVoiMint/
```

### Environment Variables
Không có — app hoàn toàn client-side.

## 4. Rollout Steps
1. Commit changes: `git add . && git commit -m "description"`
2. Push to main: `git push origin main`
3. Đợi 1-2 phút cho GitHub Pages build
4. Verify tại https://duong-euro.github.io/HocVoiMint/
5. Hard refresh (Ctrl+Shift+R) nếu thấy cache cũ

## 5. Monitoring Plan
Watch for:
- GitHub Pages build status (Actions tab)
- Console errors trên mobile browser
- Font rendering trên các thiết bị khác nhau

## 6. Rollback Plan
- How to stop: Không cần — static site, không có side effects
- How to revert code: `git revert HEAD` hoặc `git reset --hard <commit>`
- How to reset data: Không có persistent data
- Who decides: duong-euro

## 7. Post-Release Checks
- Immediate: Mở trang trên mobile, verify load OK
- Same session: Làm 1 bài quiz, verify kết quả
- Next session: Verify theme persistence

## 8. Known Limitations
- Không lưu tiến độ học tập (chỉ session stats)
- Cần internet để load Google Fonts (fallback to system font)
- GitHub Pages có thể cache 5-10 phút sau push
- Không có offline mode
