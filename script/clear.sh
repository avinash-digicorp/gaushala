BLUE='\033[0;34m'
NC='\033[0m'

echo "${BLUE}==>1. Clear IOS and Android previous build${NC}"

cd ..

rm -rf ios/build
rm -rf android/app/build
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "${BLUE}==>1. Refresh watchman${NC}"
watchman watch-del-all

echo "${BLUE}==>2. Remove cache, pods and node_modules${NC}"
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-bundler-cache-*
rm -rf node_modules/
rm -rf ios/Pods

echo "${BLUE}==>3. Re-install libraries and pods${NC}"

yarn install && cd ios && pod cache clean --all && pod install && cd ..

echo "${BLUE} Reset successful!${NC}"