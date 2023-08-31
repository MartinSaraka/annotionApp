import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import java.net.InetSocketAddress;

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
import loci.formats.MetadataTools;
import loci.formats.in.CellSensReader;
import loci.formats.meta.IMetadata;
import ome.units.UNITS;

import java.awt.image.BufferedImage;

class Server {
    private static HttpServer server = null;
    private static int port = 9090;

    private static Logger logger = Logger.getLogger(Server.class.getName());

    public static void start() throws IOException {
        InetSocketAddress socket = new InetSocketAddress(port);
        server = HttpServer.create(socket, 0);

        server.createContext("/", new ImageHandler());
        server.createContext("/metadata", new MetadataHandler());
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

            double pixelSizeX = metadataStore.getPixelsPhysicalSizeX(0).value(UNITS.METER).doubleValue();
            double pixelSizeY = metadataStore.getPixelsPhysicalSizeY(0).value(UNITS.METER).doubleValue();

            double pixelsPerMeterX = 1.0 / pixelSizeX;
            double pixelsPerMeterY = 1.0 / pixelSizeY;

            double pixelsPerMeter = (pixelsPerMeterX + pixelsPerMeterY) / 2;

            JSONObject metadata = new JSONObject();
            metadata.put("path", srcPath);
            metadata.put("width", reader.getSizeX());
            metadata.put("height", reader.getSizeY());
            metadata.put("levels", reader.getSeriesCount());
            metadata.put("format", reader.getFormat());
            metadata.put("tileWidth", reader.getOptimalTileWidth());
            metadata.put("tileHeight", reader.getOptimalTileHeight());
            metadata.put("resolution", reader.getResolution());
            metadata.put("fillColor", reader.getFillColor());
            metadata.put("pixelsPerMeterX", pixelsPerMeterX);
            metadata.put("pixelsPerMeterY", pixelsPerMeterY);
            metadata.put("pixelsPerMeter", pixelsPerMeter);

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
