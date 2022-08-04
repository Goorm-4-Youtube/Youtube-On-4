package com.Goorm.group.SpringBoot.Project.Youtube.repository;

import com.Goorm.group.SpringBoot.Project.Youtube.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Set;

public interface VideoRepository extends MongoRepository<Video,String> {

    public List<Video> findByIdIn(Set<String> videoList);
    List<Video> findById_(String id);
}
