package com.Goorm.group.SpringBoot.Project.Youtube.dto;


import com.Goorm.group.SpringBoot.Project.Youtube.model.Comment;
import com.Goorm.group.SpringBoot.Project.Youtube.model.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDto {


    private String id;
    private String title;
    private String description;
    private String userId;
    private Integer likeCount;
    private Integer dislikeCount;
    private Set<String> tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private Integer viewCount;
    private String thumbnailUrl;
    private List<Comment> commentList;

}
