rm -rf ../tmp-out
rm -rf ../build/mac-arm

mkdir ../tmp-out
cd ../tmp-out

export PATH=/Library/Java/JavaVirtualMachines/graalvm-jdk-21+35.1/Contents/Home/lib/svm/bin:$PATH

javac ../src/Server.java -cp .:../lib/bioformats.jar -d .

jar cvfm Server.jar ../src/manifest.txt ./Server*.class

# aarm64 JDK is not supported for MacOS arm64 only x64

java -jar ../lib/packr-all.jar \
     --platform mac \
     --jdk ../resources/mac/jdk-21_macos-x64_bin.tar.gz \
     --useZgcIfSupportedOs \
     --executable Server \
     --classpath ./Server.jar ../lib/bioformats.jar \
     --mainclass Server \
     --vmargs Xmx1G \
     --output ../build/mac-arm

rm -rf ../tmp-out
