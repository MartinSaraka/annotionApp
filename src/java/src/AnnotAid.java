import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import java.net.InetSocketAddress;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.Base64;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import javax.imageio.ImageIO;

import org.json.JSONObject;

import loci.common.DebugTools;
import loci.formats.FormatException;
import loci.formats.FormatTools;
import loci.formats.MetadataTools;
import loci.formats.in.CellSensReader;
import loci.formats.meta.IMetadata;

import ome.units.UNITS;
import ome.units.quantity.Length;

import java.awt.image.BufferedImage;

/**
 * AnnotAid local server
 *
 * Local server for handling WSI images using Bio-Formats library
 *
 * @implNote --port 9090 - set port number
 *
 * @apiNote /metadata/{path} - get metadata
 * @apiNote /{path} - get image tile (z-x-y-w-h)
 * @apiNote /crop/{path} - crop image (x-y-w-h-t)
 * @apiNote /stop - stop server
 *
 * @PeterSkriba
 */
class AnnotAid {
    private static HttpServer server = null;
    private static int port = 9090;

    private static Map<String, CellSensReader> cache = new ConcurrentHashMap<>();
    private static int MIN_CACHE_SIZE = 10;

    private static Logger logger = Logger.getLogger(AnnotAid.class.getName());

    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            start();
            return;
        }

        for (int i = 0; i < args.length; i++) {
            String arg = args[i];

            if (arg.startsWith("--")) {
                String argName = arg.substring(2);

                switch (argName) {
                    case "port":
                        try {
                            port = Integer.parseInt(args[i + 1]);
                            logger.info("Setting port number: " + port);
                            i++;
                        } catch (Exception exception) {
                            logger.warning("Missing port number after --port");
                            logger.info("Using default port number: " + port);
                            exception.printStackTrace();
                        }
                        break;
                    default:
                        logger.warning("Unknown argument: " + argName);
                        break;
                }
            } else {
                logger.warning("Wrong argument: " + arg);
            }
        }

        start();
    }

    /**
     * Start server
     *
     * @throws IOException
     */
    public static void start() throws IOException {
        // Cache
        int maxCacheSize = calculateMaxCacheSize();
        cache = new ConcurrentHashMap<>(maxCacheSize);

        // Server
        InetSocketAddress socket = new InetSocketAddress(port);
        server = HttpServer.create(socket, 0);

        server.createContext("/", new ImageHandler());
        server.createContext("/metadata", new MetadataHandler());
        server.createContext("/crop", new CropHandler());
        server.createContext("/stop", new StopHandler());
        server.setExecutor(Executors.newCachedThreadPool());

        server.start();
        System.out.println("Server started on port: " + port);
    }

    /**
     * Metadata handler
     *
     * @apiNote /metadata/{path}
     */
    static class MetadataHandler implements HttpHandler {
        /**
         * Handle request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            DebugTools.setRootLevel("OFF");

            long startTime = System.currentTimeMillis();

            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    process(exchange);
                } catch (IOException exception) {
                    exception.printStackTrace();
                    logger.severe(exception.getMessage());
                }
            });

            future.thenAccept((unused) -> {
                long endTime = System.currentTimeMillis();
                long executionTime = endTime - startTime;
                logger.info("Execution time: " + executionTime / 1000 + " s");
            });
        }

        /**
         * Process request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        public synchronized void process(HttpExchange exchange) throws IOException {
            // Source path
            String srcPath;

            try {
                srcPath = getParsedPath(exchange, "/metadata");
            } catch (Exception exception) {
                logger.severe(exception.getMessage());
                exception.printStackTrace();
                sendResponse(exchange, 403, exception.getMessage());
                return;
            }

            // Initialize reader
            CellSensReader reader = null;

            try {
                reader = getOrCreateReader(srcPath);
            } catch (Exception exception) {
                logger.severe(exception.getMessage());
                exception.printStackTrace();
                sendResponse(exchange, 404, exception.getMessage());
                return;
            }

            reader.setSeries(0);

            // Get metadata store
            IMetadata metadataStore = (IMetadata) reader.getMetadataStore();

            // START Metadata
            JSONObject metadata = new JSONObject();
            String magnification = reader.getGlobalMetadata().get("Magnification").toString();

            metadata.put("path", srcPath);
            metadata.put("domains", reader.getDomains());
            metadata.put("format", reader.getFormat());
            metadata.put("resolution", reader.getResolution());
            metadata.put("fillColor", reader.getFillColor());
            metadata.put("levels", reader.getSeriesCount());
            metadata.put("magnification", Double.parseDouble(magnification));
            // END Metadata

            // START Tile
            JSONObject tileJSON = new JSONObject();
            int tileWidth = reader.getOptimalTileWidth();
            int tileHeight = reader.getOptimalTileHeight();

            JSONObject optimalTileJSON = new JSONObject();
            optimalTileJSON.put("width", tileWidth);
            optimalTileJSON.put("height", tileHeight);
            tileJSON.put("optimal", optimalTileJSON);

            metadata.put("tile", tileJSON);
            // END Tile

            // START Pixel
            JSONObject pixelJSON = new JSONObject();
            Length pixelWidth = metadataStore.getPixelsPhysicalSizeX(0);
            Length pixelHeight = metadataStore.getPixelsPhysicalSizeY(0);

            JSONObject pixelWidthJSON = new JSONObject();
            pixelWidthJSON.put("meter", pixelWidth.value(UNITS.METER).doubleValue());
            pixelWidthJSON.put("micro", pixelWidth.value(UNITS.MICROMETER).doubleValue());
            pixelJSON.put("width", pixelWidthJSON);

            JSONObject pixelHeightJSON = new JSONObject();
            pixelHeightJSON.put("meter", pixelHeight.value(UNITS.METER).doubleValue());
            pixelHeightJSON.put("micro", pixelHeight.value(UNITS.MICROMETER).doubleValue());
            pixelJSON.put("height", pixelHeightJSON);

            pixelJSON.put("type", FormatTools.getPixelTypeString(reader.getPixelType()));
            metadata.put("pixel", pixelJSON);
            // END Pixel

            // START Pixels per meter
            JSONObject pixelsPerMeterJSON = new JSONObject();
            double pixelsPerMeterX = 1.0 / pixelWidth.value(UNITS.METER).doubleValue();
            double pixelsPerMeterY = 1.0 / pixelHeight.value(UNITS.METER).doubleValue();
            double pixelsPerMeterAvg = (pixelsPerMeterX + pixelsPerMeterY) / 2;

            pixelsPerMeterJSON.put("x", pixelsPerMeterX);
            pixelsPerMeterJSON.put("y", pixelsPerMeterY);
            pixelsPerMeterJSON.put("avg", pixelsPerMeterAvg);

            metadata.put("pixelsPerMeter", pixelsPerMeterJSON);
            // END Pixels per meter

            // START Size
            JSONObject sizeJSON = new JSONObject();
            double sizeWidth = reader.getSizeX();
            double sizeHeight = reader.getSizeY();
            double sizeZ = reader.getSizeZ();
            double sizeC = reader.getSizeC();
            double sizeT = reader.getSizeT();

            sizeJSON.put("z", sizeZ);
            sizeJSON.put("c", sizeC);
            sizeJSON.put("t", sizeT);

            JSONObject sizeWidthJSON = new JSONObject();
            sizeWidthJSON.put("pixel", sizeWidth);
            sizeWidthJSON.put("micro", sizeWidth * pixelWidth.value(UNITS.MICROMETER).doubleValue());
            sizeJSON.put("width", sizeWidthJSON);

            JSONObject sizeHeightJSON = new JSONObject();
            sizeHeightJSON.put("pixel", sizeHeight);
            sizeHeightJSON.put("micro", sizeHeight * pixelHeight.value(UNITS.MICROMETER).doubleValue());
            sizeJSON.put("height", sizeHeightJSON);

            metadata.put("size", sizeJSON);
            // END Size

            // START File Size
            JSONObject fileSizeJSON = new JSONObject();
            double bitsPerPixel = reader.getBitsPerPixel();
            String[] usedFiles = reader.getUsedFiles();

            double uncompressed = sizeWidth * sizeHeight * sizeZ * sizeC * sizeT * bitsPerPixel / 8;
            fileSizeJSON.put("uncompressed", uncompressed);

            double compressed = 0;
            for (String usedFile : usedFiles) {
                Path filePath = Paths.get(usedFile);
                compressed += Files.size(filePath);
            }
            fileSizeJSON.put("compressed", compressed);

            metadata.put("fileSize", fileSizeJSON);
            // END File Size

            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Metadata", metadata.toString());
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");

            sendResponse(exchange, 200, metadata.toString());
            logger.info("Metadata sent");
        }
    }

    /**
     * Image handler
     *
     * @apiNote /{path} with pattern: z-x-y-w-h
     */
    static class ImageHandler implements HttpHandler {
        /**
         * Handle request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            DebugTools.setRootLevel("OFF");

            long startTime = System.currentTimeMillis();

            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    process(exchange);
                } catch (IOException exception) {
                    exception.printStackTrace();
                    logger.severe(exception.getMessage());
                }
            });

            future.thenAccept((unused) -> {
                long endTime = System.currentTimeMillis();
                long executionTime = endTime - startTime;
                logger.info("Execution time: " + executionTime / 1000 + " s");
            });
        }

        /**
         * Process request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        public synchronized void process(HttpExchange exchange) throws IOException {
            String originalPath = null;

            try {
                originalPath = getOriginalPath(exchange, "");
            } catch (Exception exception) {
                logger.severe(exception.getMessage());
                exception.printStackTrace();
                sendResponse(exchange, 403, exception.getMessage());
                return;
            }

            String srcPath = getSourcePath(originalPath, "-\\d+-\\d+-\\d+-\\d+-\\d+.");

            // Initialize reader
            CellSensReader reader = null;

            try {
                reader = getOrCreateReader(srcPath);
            } catch (Exception exception) {
                logger.severe(exception.getMessage());
                exception.printStackTrace();
                sendResponse(exchange, 404, exception.getMessage());
                return;
            }

            reader.setSeries(0);

            // Image parameters
            int width = reader.getSizeX();
            int height = reader.getSizeY();
            int levels = reader.getSeriesCount();

            // Get filename from path
            Path path = Paths.get(originalPath);
            String filename = path.getFileName().toString();

            // Get parameters from filename
            int[] parameters = { 1, 0, 0, reader.getOptimalTileWidth(), reader.getOptimalTileHeight() };

            try {
                parameters = extractNumbers(filename, "\\d+-\\d+-\\d+-\\d+-\\d+", parameters.length);
            } catch (Exception exception) {
                logger.warning(exception.getMessage());
            }

            // Set parameters
            int z = parameters[0];
            int x = parameters[1];
            int y = parameters[2];
            int w = parameters[3];
            int h = parameters[4];

            reader.setSeries(levels - z);

            // Series parameters
            int seriesWidth = reader.getSizeX();
            int seriesHeight = reader.getSizeY();

            // Check parameters
            int tileWidth = w;
            int tileHeight = h;

            if (x * w + w > seriesWidth) {
                tileWidth = seriesWidth - x * w;
            }

            if (y * h + h > seriesHeight) {
                tileHeight = seriesHeight - y * h;
            }

            // Open bytes
            byte[] imageData = new byte[w * h * 3];

            try {
                reader.openBytes(0, imageData, x * w, y * h, tileWidth, tileHeight);
            } catch (FormatException exception) {
                logger.severe("Cannot open bytes from path: " + srcPath);
                exception.printStackTrace();
                sendResponse(exchange, 500, "Cannot open bytes from path: " + srcPath);
                return;
            }

            // Create image
            BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_3BYTE_BGR);
            image.getRaster().setDataElements(0, 0, tileWidth, tileHeight, imageData);

            // Write image
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            // Set response
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "image/png");
            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Width", String.format("%d", width));
            exchange.getResponseHeaders().set("X-Height", String.format("%d", height));
            exchange.getResponseHeaders().set("X-Levels", String.format("%d", levels));
            exchange.getResponseHeaders().set("X-Format", reader.getFormat());
            exchange.getResponseHeaders().set("X-Tile", String.format("%d-%d-%d-%d-%d", z, x, y, w, h));
            exchange.sendResponseHeaders(200, imageBytes.length);

            // Send response
            OutputStream responseBody = exchange.getResponseBody();
            responseBody.write(imageBytes);
            responseBody.close();

            logger.info(String.format("%d-%d-%d-%d-%d", z, x, y, w, h) + " (z-x-y-w-h)");
            logger.info("Tile sent");
        }
    }

    /**
     * Crop handler
     *
     * @apiNote /crop/{path} with pattern: x-y-w-h-t
     */
    static class CropHandler implements HttpHandler {
        /**
         * Handle request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            DebugTools.setRootLevel("OFF");

            long startTime = System.currentTimeMillis();

            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                try {
                    process(exchange);
                } catch (IOException exception) {
                    exception.printStackTrace();
                    logger.severe(exception.getMessage());
                }
            });

            future.thenAccept((unused) -> {
                long endTime = System.currentTimeMillis();
                long executionTime = endTime - startTime;
                logger.info("Execution time: " + executionTime / 1000 + " s");
            });
        }

        /**
         * Process request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        public synchronized void process(HttpExchange exchange) throws IOException {
            String originalPath = null;

            try {
                originalPath = getOriginalPath(exchange, "/crop");
            } catch (Exception exception) {
                logger.severe(exception.getMessage());
                exception.printStackTrace();
                sendResponse(exchange, 403, exception.getMessage());
                return;
            }

            String srcPath = getSourcePath(originalPath, "-\\d+-\\d+-\\d+-\\d+-\\d+.");

            // Initialize reader
            CellSensReader reader = null;

            try {
                reader = getOrCreateReader(srcPath);
            } catch (Exception exception) {
                logger.severe(exception.getMessage());
                exception.printStackTrace();
                sendResponse(exchange, 404, exception.getMessage());
                return;
            }

            reader.setSeries(0);

            // Get filename from path
            Path path = Paths.get(originalPath);
            String filename = path.getFileName().toString();

            // Get parameters from filename
            int[] parameters = { 0, 0, reader.getOptimalTileWidth(), reader.getOptimalTileHeight(), 0 };

            try {
                parameters = extractNumbers(filename, "\\d+-\\d+-\\d+-\\d+-\\d+", parameters.length);
            } catch (Exception exception) {
                logger.warning(exception.getMessage());
            }

            // Set parameters
            int x = parameters[0];
            int y = parameters[1];
            int w = parameters[2];
            int h = parameters[3];
            int t = parameters[4]; // t == 0 -> top-left, t == 1 -> center-center

            reader.setSeries(0);

            // Series parameters
            int seriesWidth = reader.getSizeX();
            int seriesHeight = reader.getSizeY();

            // Check parameters
            int startX = x - (t == 0 ? 0 : w / 2);
            int startY = y - (t == 0 ? 0 : h / 2);

            if (startX < 0) {
                startX = 0;
            }

            if (startX + w > seriesWidth) {
                startX = seriesWidth - w;
            }

            if (startY < 0) {
                startY = 0;
            }

            if (startY + h > seriesHeight) {
                startY = seriesHeight - h;
            }

            // Open bytes
            byte[] imageData = new byte[w * h * 3];

            try {
                reader.openBytes(0, imageData, startX, startY, w, h);
            } catch (FormatException exception) {
                logger.severe("Cannot open bytes from path: " + srcPath);
                exception.printStackTrace();
                sendResponse(exchange, 500, "Cannot open bytes from path: " + srcPath);
                return;
            }

            // Create image
            BufferedImage bufferedImage = new BufferedImage(w, h, BufferedImage.TYPE_3BYTE_BGR);
            bufferedImage.getRaster().setDataElements(0, 0, w, h, imageData);

            // Write image
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            // Convert to base64
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // Set data
            JSONObject data = new JSONObject();
            data.put("width", w);
            data.put("height", h);
            data.put("x", startX);
            data.put("y", startY);
            data.put("t", t);

            // Set response
            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Metadata", data.toString());
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");

            data.put("base64Image", base64Image);

            logger.info(String.format("%d-%d-%d-%d-%d", x, y, w, h, t) + " (x-y-w-h-t)");

            // Send response
            sendResponse(exchange, 200, data.toString());
            logger.info("Cropped image sent");
        }
    }

    /**
     * Stop handler
     *
     * @apiNote /stop
     */
    static class StopHandler implements HttpHandler {
        /**
         * Handle request
         *
         * @param exchange HttpExchange object
         * @throws IOException
         */
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            server.stop(0);
            System.out.println("Server stopped");
        }
    }

    // Utils

    /**
     * Send response
     *
     * @param exchange     HttpExchange object
     * @param statusCode   Status code
     * @param responseText Response text
     * @throws IOException
     */
    private static void sendResponse(HttpExchange exchange, int statusCode, String responseText) throws IOException {
        exchange.sendResponseHeaders(statusCode, responseText.length());
        OutputStream responseBody = exchange.getResponseBody();
        responseBody.write(responseText.getBytes());
        responseBody.close();
    }

    /**
     * Calculate max cache size
     *
     * @apiNote 10% of max memory
     * @return Max cache size
     */
    private static int calculateMaxCacheSize() {
        long maxMemory = Runtime.getRuntime().maxMemory();
        logger.info("Max available memory: " + maxMemory + " bytes");

        int maxCacheSize = (int) (maxMemory / (1024 * 1024) / 10);
        logger.info("Max cache size: " + maxCacheSize);

        return Math.max(maxCacheSize, MIN_CACHE_SIZE);
    }

    /**
     * Get or create reader
     *
     * @param srcPath Source path
     * @return CellSensReader object
     * @throws Exception
     */
    private static CellSensReader getOrCreateReader(String srcPath) throws Exception {
        CellSensReader reader = cache.get(srcPath);

        if (reader == null) {
            IMetadata metadataStore = MetadataTools.createOMEXMLMetadata();

            reader = new CellSensReader();

            try {
                reader.setMetadataStore(metadataStore);
                reader.setId(srcPath);
            } catch (FormatException formatException) {
                reader.close();
                System.out.println("formatException: " + formatException.getMessage());
                throw new Exception("Cannot read file from source path: " + srcPath);
            } catch (IOException ioException) {
                reader.close();
                System.out.println("IOException: " + ioException.getMessage());
                throw new Exception("Cannot open file from source path: " + srcPath);
            }

            cache.put(srcPath, reader);
        }

        return reader;
    }

    /**
     * Get parsed path
     *
     * @param exchange HttpExchange object
     * @param target   Target path
     * @return Parsed path
     * @throws Exception
     */
    private static String getParsedPath(HttpExchange exchange, String target) throws Exception {
        String path = exchange.getRequestURI().getPath();
        String srcPath = path.replace(target, "");

        if (srcPath.isEmpty() || srcPath.equals("/")) {
            throw new Exception("File Not Specified: " + srcPath);
        }

        return srcPath;
    }

    /**
     * Get original path
     *
     * @param exchange HttpExchange object
     * @return Original path
     * @throws Exception
     */
    private static String getOriginalPath(HttpExchange exchange, CharSequence target) throws Exception {
        String originalPath = exchange.getRequestURI().getPath();

        originalPath = originalPath.replace(target, "");

        if (originalPath.isEmpty() || originalPath.equals("/")) {
            throw new Exception("File Not Specified: " + originalPath);
        }

        return originalPath;
    }

    /**
     * Get source path
     *
     * @param path  Original path
     * @param regex Regex
     * @return Source path
     */
    private static String getSourcePath(String path, String regex) {
        String srcPath = path.replaceAll(regex, ".");
        return srcPath;
    }

    /**
     * Extract numbers
     *
     * @param input  Input string
     * @param regex  Regex
     * @param length Expected length
     * @return Array of numbers of expected length
     * @throws Exception
     */
    private static int[] extractNumbers(String input, String regex, int length) throws Exception {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);

        if (matcher.find()) {
            String strNumbers = matcher.group();
            String[] numberStrings = strNumbers.split("-");

            if (numberStrings.length == length) {
                int[] numbers = new int[length];

                for (int i = 0; i < length; i++) {
                    numbers[i] = Integer.parseInt(numberStrings[i]);
                }

                return numbers;
            } else {
                throw new Exception("Wrong parameters count, expected: " + length);
            }
        } else {
            throw new Exception("Pattern not found: " + input);
        }
    }
}
