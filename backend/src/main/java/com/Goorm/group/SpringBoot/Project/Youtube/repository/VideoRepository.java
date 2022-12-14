package com.Goorm.group.SpringBoot.Project.Youtube.repository;

import com.Goorm.group.SpringBoot.Project.Youtube.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Set;

public interface VideoRepository extends MongoRepository<Video,String> {
    List<Video> findById_(String id);

    List<Video> findByUserId(String userId);
    List<Video> findByIdIn(Set<String> videoList);
    List<Video> findByVideoStatus(String status);

    List<Video> findByTitleContainingIgnoreCase(String query);
}
