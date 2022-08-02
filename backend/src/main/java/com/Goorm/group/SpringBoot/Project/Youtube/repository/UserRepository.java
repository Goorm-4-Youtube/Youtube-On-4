package com.Goorm.group.SpringBoot.Project.Youtube.repository;

import com.Goorm.group.SpringBoot.Project.Youtube.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findBySub(String sub);
}
