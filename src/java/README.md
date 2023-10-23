# JAVA

## Build

### 0. Set PATH to GraalVM bin directory `OPTIONAL`

```bash
export PATH=/Library/Java/JavaVirtualMachines/graalvm-jdk-21+35.1/Contents/Home/lib/svm/bin:$PATH
```

### 1. Navigate to [`out directory`](./out)

```bash
cd out
```

### 2. Generate `.class` files from `.java` file

```bash
javac ../src/Server.java -cp .:../lib/bioformats.jar
```

### 3. Generate `.jar` file from `.class` files

```bash
jar cvfm Server.jar ../src/manifest.txt Server.class Server\$ImageHandler.class Server\$MetadataHandler.class Server\$StopHandler.class Server\$ThumbnailHandler.class Server\$CropHandler.class
```

### 4. Generate `executable` from `.jar` file

```bash
java -jar ../lib/packr-all.jar \
     --platform mac \
     --jdk ../resources/jdk-21_macos-x64_bin.tar.gz \
     --useZgcIfSupportedOs \
     --executable Server \
     --classpath Server.jar ../lib/bioformats.jar \
     --mainclass Server \
     --vmargs Xmx1G \
     --output mac
```

### 5. Run `executable`

Double click on `Server` in [`build/mac/Contents/MacOS`](./build/mac-arm/Contents/MacOS) directory.
