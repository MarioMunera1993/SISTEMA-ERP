package com.example.system_erp.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("No se pudo crear el directorio donde se almacenarán los archivos subidos.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        return storeFile(file, UUID.randomUUID().toString());
    }

    public String storeFile(MultipartFile file, String preferredFileName) {
        String fileNameWithExt = file.getOriginalFilename();
        if (fileNameWithExt == null)
            throw new RuntimeException("Nombre de archivo nulo");
        String originalFileName = StringUtils.cleanPath(fileNameWithExt);
        try {
            if (originalFileName.contains("..")) {
                throw new RuntimeException("¡Lo siento! El nombre del archivo contiene una secuencia de ruta inválida "
                        + originalFileName);
            }

            String extension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i > 0) {
                extension = originalFileName.substring(i);
            }

            String fileName = preferredFileName + extension;

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException(
                    "No se pudo almacenar el archivo " + originalFileName + ". ¡Por favor, inténtelo de nuevo!", ex);
        }
    }
}
