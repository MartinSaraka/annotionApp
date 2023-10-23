rm -rf ../tmp-out
rm -rf ../build/win

mkdir ../tmp-out
cd ../tmp-out

export PATH=/Library/Java/JavaVirtualMachines/graalvm-jdk-21+35.1/Contents/Home/lib/svm/bin:$PATH

javac ../src/Server.java -cp .:../lib/bioformats.jar -d .

jar cvfm Server.jar ../src/manifest.txt ./Server*.class

java -jar ../lib/packr-all.jar \
     --platform windows64 \
     --jdk ../resources/win/jdk-21_windows-x64_bin.zip \
     --useZgcIfSupportedOs \
     --executable Server \
     --classpath ./Server.jar ../lib/bioformats.jar \
     --mainclass Server \
     --vmargs Xmx1G \
     --output ../build/win

rm -rf ../tmp-out

