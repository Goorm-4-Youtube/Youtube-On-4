package com.Goorm.group.SpringBoot.Project.Youtube.repository;

import com.Goorm.group.SpringBoot.Project.Youtube.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video,String> {
}
