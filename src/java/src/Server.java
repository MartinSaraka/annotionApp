import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import java.awt.Image;

class Server {
    private static HttpServer server = null;
    private static int port = 9090;

    private static Logger logger = Logger.getLogger(Server.class.getName());

    public static void start() throws IOException {
        InetSocketAddress socket = new InetSocketAddress(port);
        server = HttpServer.create(socket, 0);

        server.createContext("/", new ImageHandler());
        server.createContext("/metadata", new MetadataHandler());
        server.createContext("/crop", new CropHandler());
        server.createContext("/thumbnail", new ThumbnailHandler());
        server.createContext("/stop", new StopHandler());
        server.setExecutor(null);

        server.start();
        System.out.println("Server started on port " + port);
    }

    static class ThumbnailHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            DebugTools.setRootLevel("OFF");

            String path = exchange.getRequestURI().getPath();
            String srcPath = path.replace("/thumbnail", "");

            if (srcPath.isEmpty() || srcPath.equals("/")) {
                logger.severe("File Not Specified");
                sendResponse(exchange, 500, "File Not Specified");
                return;
            }

            if (!new File(srcPath).exists()) {
                logger.severe("File Not Found");
                sendResponse(exchange, 404, "File Not Found");
                return;
            }

            logger.info("Reading file from source path: " + srcPath);

            CellSensReader reader = new CellSensReader();

            try {
                reader.setId(srcPath);
            } catch (FormatException e) {
                logger.severe("Cannot open file from source path: " + srcPath);
                e.printStackTrace();

                reader.close();
                sendResponse(exchange, 404, "Cannot open file: " + e);
                return;
            }

            int thumbWidth = reader.getThumbSizeX();
            int thumbHeight = reader.getThumbSizeY();
            byte[] thumbBytes;

            try {
                thumbBytes = reader.openThumbBytes(0);
            } catch (FormatException e) {
                logger.severe("Cannot open thumbnail from source path: " + srcPath);
                e.printStackTrace();

                reader.close();
                sendResponse(exchange, 500, "Cannot open thumbnail: " + e);
                return;
            }

            BufferedImage image = new BufferedImage(thumbWidth, thumbHeight, BufferedImage.TYPE_3BYTE_BGR);
            image.getRaster().setDataElements(0, 0, thumbWidth, thumbHeight, thumbBytes);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "image/png");
            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Width", String.format("%d", thumbWidth));
            exchange.getResponseHeaders().set("X-Height", String.format("%d", thumbHeight));
            exchange.sendResponseHeaders(200, imageBytes.length);

            OutputStream responseBody = exchange.getResponseBody();
            responseBody.write(imageBytes);
            responseBody.close();

            reader.close();
            logger.info("DONE");
        }
    }

    static class MetadataHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            DebugTools.setRootLevel("OFF");

            String path = exchange.getRequestURI().getPath();
            String srcPath = path.replace("/metadata", "");

            if (srcPath.isEmpty() || srcPath.equals("/")) {
                logger.severe("File Not Specified");
                sendResponse(exchange, 500, "File Not Specified");
                return;
            }

            if (!new File(srcPath).exists()) {
                logger.severe("File Not Found");
                sendResponse(exchange, 404, "File Not Found");
                return;
            }

            logger.info("Reading file from source path: " + srcPath);

            CellSensReader reader = new CellSensReader();
            IMetadata metadataStore = MetadataTools.createOMEXMLMetadata();

            try {
                reader.setMetadataStore(metadataStore);
                reader.setId(srcPath);
            } catch (FormatException e) {
                logger.severe("Cannot open file from source path: " + srcPath);
                e.printStackTrace();

                reader.close();
                sendResponse(exchange, 404, "Cannot open file: " + e);
                return;
            }

            String magnification = reader.getGlobalMetadata().get("Magnification").toString();

            JSONObject metadata = new JSONObject();
            metadata.put("path", srcPath);

            metadata.put("domains", reader.getDomains());
            metadata.put("format", reader.getFormat());

            metadata.put("magnification", Double.parseDouble(magnification));
            metadata.put("levels", reader.getSeriesCount());

            metadata.put("resolution", reader.getResolution());
            metadata.put("fillColor", reader.getFillColor());

            /* START Tile */
            JSONObject tileJSON = new JSONObject();
            int tileWidth = reader.getOptimalTileWidth();
            int tileHeight = reader.getOptimalTileHeight();

            JSONObject optimalTileJSON = new JSONObject();
            optimalTileJSON.put("width", tileWidth);
            optimalTileJSON.put("height", tileHeight);
            tileJSON.put("optimal", optimalTileJSON);

            metadata.put("tile", tileJSON);
            /* END Tile */

            /* START Pixel */
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
            /* END Pixel */

            /* START Pixels per meter */
            JSONObject pixelsPerMeterJSON = new JSONObject();
            double pixelsPerMeterX = 1.0 / pixelWidth.value(UNITS.METER).doubleValue();
            double pixelsPerMeterY = 1.0 / pixelHeight.value(UNITS.METER).doubleValue();
            double pixelsPerMeterAvg = (pixelsPerMeterX + pixelsPerMeterY) / 2;

            pixelsPerMeterJSON.put("x", pixelsPerMeterX);
            pixelsPerMeterJSON.put("y", pixelsPerMeterY);
            pixelsPerMeterJSON.put("avg", pixelsPerMeterAvg);

            metadata.put("pixelsPerMeter", pixelsPerMeterJSON);
            /* END Pixels per meter */

            /* START Size */
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
            /* END Size */

            /* START File Size */
            JSONObject fileSizeJSON = new JSONObject();
            double bitsPerPixel = reader.getBitsPerPixel();
            String[] usedFiles = reader.getUsedFiles();

            fileSizeJSON.put("uncompressed", sizeWidth * sizeHeight * sizeZ * sizeC * sizeT * bitsPerPixel / 8);

            double totalFileSize = 0;
            for (String usedFile : usedFiles) {
                Path filePath = Paths.get(usedFile);
                totalFileSize += Files.size(filePath);
            }
            fileSizeJSON.put("compressed", totalFileSize);

            metadata.put("fileSize", fileSizeJSON);
            /* END File Size */

            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Metadata", metadata.toString());
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");

            reader.close();
            logger.info("Sending metadata: " + metadata.toString());
            sendResponse(exchange, 200, metadata.toString());
            logger.info("DONE");
        }
    }

    static class ImageHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            System.out.println("---------------------------------");
            DebugTools.setRootLevel("OFF");

            String originalPath = exchange.getRequestURI().getPath();

            if (originalPath.isEmpty() || originalPath.equals("/")) {
                logger.severe("File Not Specified");
                sendResponse(exchange, 500, "File Not Specified");
                return;
            }

            Path path = Paths.get(originalPath);
            String filename = path.getFileName().toString();
            String srcPath = originalPath.replaceAll("-\\d+-\\d+-\\d+-\\d+-\\d+.", ".");

            if (!new File(srcPath).exists()) {
                logger.severe("File Not Found");
                sendResponse(exchange, 404, "File Not Found");
                return;
            }

            logger.info("Reading file from source path: " + srcPath);

            CellSensReader reader = new CellSensReader();

            try {
                reader.setId(srcPath);
            } catch (FormatException e) {
                logger.severe("Cannot open file from source path: " + srcPath);
                e.printStackTrace();

                reader.close();
                sendResponse(exchange, 404, "Cannot open file: " + e);
                return;
            }

            int z = 1;
            int x = 0;
            int y = 0;
            int w = reader.getOptimalTileWidth();
            int h = reader.getOptimalTileHeight();

            int width = reader.getSizeX();
            int height = reader.getSizeY();
            int levels = reader.getSeriesCount();

            Pattern pattern = Pattern.compile("\\d+-\\d+-\\d+-\\d+-\\d+");
            Matcher matcher = pattern.matcher(filename);

            if (matcher.find()) {
                String strNumbers = matcher.group();
                String[] numbers = strNumbers.split("-");

                if (numbers.length == 5) {
                    z = Integer.parseInt(numbers[0]);
                    x = Integer.parseInt(numbers[1]);
                    y = Integer.parseInt(numbers[2]);
                    w = Integer.parseInt(numbers[3]);
                    h = Integer.parseInt(numbers[4]);
                } else {
                    logger.warning("Four numbers (z-x-y-s) not found in path: " + originalPath);
                    logger.info("Default values: " + String.format("z=%d, x=%d, y=%d, w=%d, h=%d", z, x, y, w, h));
                }
            } else {
                logger.warning("Pattern (z-x-y-s) not found in path: " + originalPath);
                logger.info("Default values: " + String.format("z=%d, x=%d, y=%d, w=%d, h=%d", z, x, y, w, h));
            }

            reader.setSeries(levels - z);

            int seriesWidth = reader.getSizeX();
            int seriesHeight = reader.getSizeY();

            int tileWidth = w;
            int tileHeight = h;

            if (x * w + w > seriesWidth) {
                tileWidth = seriesWidth - x * w;
            }

            if (y * h + h > seriesHeight) {
                tileHeight = seriesHeight - y * h;
            }

            byte[] imageData = new byte[w * h * 3];

            try {
                reader.openBytes(0, imageData, x * w, y * h, tileWidth, tileHeight);
            } catch (FormatException e) {

                for (int i = 0; i < w * h; i++) {
                    imageData[i * 3] = (byte) 255; // Red
                    imageData[i * 3 + 1] = (byte) 0; // Green
                    imageData[i * 3 + 2] = (byte) 0; // Blue
                }

                System.out.println("RED");

            }

            BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_3BYTE_BGR);

            if (tileWidth < w || tileHeight < h) {
                byte[] bg = new byte[w * h * 3];

                for (int i = 0; i < w * h; i++) {
                    bg[i * 3] = (byte) 0; // Red
                    bg[i * 3 + 1] = (byte) 255; // Green
                    bg[i * 3 + 2] = (byte) 0; // Blue
                }

                image.getRaster().setDataElements(0, 0, w, h, bg);
            }

            image.getRaster().setDataElements(0, 0, tileWidth, tileHeight, imageData);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "image/png");
            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Width", String.format("%d", width));
            exchange.getResponseHeaders().set("X-Height", String.format("%d", height));
            exchange.getResponseHeaders().set("X-Levels", String.format("%d", levels));
            exchange.getResponseHeaders().set("X-Format", reader.getFormat());
            exchange.getResponseHeaders().set("X-Tile", String.format("%d-%d-%d-%d-%d", z, x, y, w, h));
            exchange.sendResponseHeaders(200, imageBytes.length);

            logger.info(String.format("%d-%d-%d-%d-%d", z, x, y, w, h) + " (z-x-y-w-h)");

            OutputStream responseBody = exchange.getResponseBody();
            responseBody.write(imageBytes);
            responseBody.close();

            reader.close();
            logger.info("DONE");
        }
    }

    static class CropHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            System.out.println("---------------------------------");
            DebugTools.setRootLevel("OFF");

            String originalPath = exchange.getRequestURI().getPath();

            if (originalPath.isEmpty() || originalPath.equals("/")) {
                logger.severe("File Not Specified");
                sendResponse(exchange, 500, "File Not Specified");
                return;
            }

            Path path = Paths.get(originalPath);
            String filename = path.getFileName().toString();
            String srcPath = originalPath.replace("/crop", "").replaceAll("-\\d+-\\d+-\\d+-\\d+.", ".");

            if (!new File(srcPath).exists()) {
                logger.severe("File Not Found");
                sendResponse(exchange, 404, "File Not Found");
                return;
            }

            logger.info("Reading file from source path: " + srcPath);

            CellSensReader reader = new CellSensReader();

            try {
                reader.setId(srcPath);
            } catch (FormatException e) {
                logger.severe("Cannot open file from source path: " + srcPath);
                e.printStackTrace();

                reader.close();
                sendResponse(exchange, 404, "Cannot open file: " + e);
                return;
            }

            int x = 0;
            int y = 0;
            int w = reader.getOptimalTileWidth();
            int h = reader.getOptimalTileHeight();

            int width = reader.getSizeX();
            int height = reader.getSizeY();

            Pattern pattern = Pattern.compile("\\d+-\\d+-\\d+-\\d+");
            Matcher matcher = pattern.matcher(filename);

            if (matcher.find()) {
                String strNumbers = matcher.group();
                String[] numbers = strNumbers.split("-");

                if (numbers.length == 4) {
                    x = Integer.parseInt(numbers[0]);
                    y = Integer.parseInt(numbers[1]);
                    w = Integer.parseInt(numbers[2]);
                    h = Integer.parseInt(numbers[3]);
                } else {
                    logger.warning("Four numbers (x-y-w-h) not found in path: " + originalPath);
                    logger.info("Default values: " + String.format("x=%d, y=%d, w=%d, h=%d", x, y, w, h));
                }
            } else {
                logger.warning("Pattern (x-x-w-h) not found in path: " + originalPath);
                logger.info("Default values: " + String.format("x=%d, y=%d, w=%d, h=%d", x, y, w, h));
            }

            reader.setSeries(8);

            int seriesWidth = reader.getSizeX();
            int seriesHeight = reader.getSizeY();

            int tileWidth = w;
            int tileHeight = h;

            if (x + w > seriesWidth) {
                tileWidth = seriesWidth - x;
            }

            if (y + h > seriesHeight) {
                tileHeight = seriesHeight - y;
            }

            byte[] imageData = new byte[w * h * 3];

            try {
                reader.openBytes(0, imageData, x, y, tileWidth, tileHeight);
            } catch (FormatException e) {
                System.out.println(e);

                for (int i = 0; i < w * h; i++) {
                    imageData[i * 3] = (byte) 255; // Red
                    imageData[i * 3 + 1] = (byte) 0; // Green
                    imageData[i * 3 + 2] = (byte) 0; // Blue
                }

                System.out.println("RED");
            }

            BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_3BYTE_BGR);

            if (tileWidth < w || tileHeight < h) {
                byte[] bg = new byte[w * h * 3];

                for (int i = 0; i < w * h; i++) {
                    bg[i * 3] = (byte) 0; // Red
                    bg[i * 3 + 1] = (byte) 0; // Green
                    bg[i * 3 + 2] = (byte) 0; // Blue
                }

                image.getRaster().setDataElements(0, 0, w, h, bg);
            }

            image.getRaster().setDataElements(0, 0, tileWidth, tileHeight, imageData);

            double maxSize = Math.max(w, h);
            double ratio = maxSize / 256;

            int newWidth = (int) Math.round(tileWidth * ratio);
            int newHeight = (int) Math.round(tileHeight * ratio);

            Image rescaled = image.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);

            BufferedImage bufferedImage = new BufferedImage(
                    rescaled.getWidth(null),
                    rescaled.getHeight(null),
                    BufferedImage.TYPE_INT_RGB);

            bufferedImage.getGraphics().drawImage(rescaled, 0, 0, null);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "image/png");
            exchange.getResponseHeaders().set("X-Path", srcPath);
            exchange.getResponseHeaders().set("X-Width", String.format("%d", width));
            exchange.getResponseHeaders().set("X-Height", String.format("%d", height));
            exchange.getResponseHeaders().set("X-X", String.format("%d", x));
            exchange.getResponseHeaders().set("X-Y", String.format("%d", y));
            exchange.getResponseHeaders().set("X-Tile", String.format("%d-%d-%d-%d", x, y, w, h));
            exchange.sendResponseHeaders(200, imageBytes.length);

            logger.info(String.format("%d-%d-%d-%d", x, y, w, h) + " (x-y-w-h)");

            OutputStream responseBody = exchange.getResponseBody();
            responseBody.write(imageBytes);
            responseBody.close();

            reader.close();
            logger.info("DONE");
        }
    }

    static class StopHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            server.stop(0);
            System.out.println("Server stopped");
        }
    }

    public static void sendResponse(HttpExchange exchange, int statusCode, String responseText) throws IOException {
        exchange.sendResponseHeaders(statusCode, responseText.length());
        OutputStream responseBody = exchange.getResponseBody();
        responseBody.write(responseText.getBytes());
        responseBody.close();
    }

    public static void main(String[] args) throws IOException {
        int port = 9090;

        if (args.length > 0) {
            for (int i = 0; i < args.length; i++) {
                String arg = args[i];

                if (arg.startsWith("--")) {
                    String argName = arg.substring(2);

                    switch (argName) {
                        case "port":
                            try {
                                port = Integer.parseInt(args[i + 1]);
                                System.out.println("Port number: " + port);
                                i++;
                            } catch (Exception e) {
                                System.out.println("Missing port number after --port");
                                e.printStackTrace();
                            }
                            break;
                        default:
                            System.out.println("Unknown argument: " + argName);
                            break;
                    }
                }
            }
        }

        start();
    }
}
