package com.Goorm.group.SpringBoot.Project.Youtube.Service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String uploadFile(MultipartFile file);
}
