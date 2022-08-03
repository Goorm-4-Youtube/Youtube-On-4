package com.Goorm.group.SpringBoot.Project.Youtube.Service;


import com.Goorm.group.SpringBoot.Project.Youtube.dto.CommentDto;
import com.Goorm.group.SpringBoot.Project.Youtube.dto.UploadVideoResponse;
import com.Goorm.group.SpringBoot.Project.Youtube.dto.VideoDto;
import com.Goorm.group.SpringBoot.Project.Youtube.model.Comment;
import com.Goorm.group.SpringBoot.Project.Youtube.model.Video;
import com.Goorm.group.SpringBoot.Project.Youtube.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3service;
    private final VideoRepository videoRepository;
    private final UserService userService;
    public UploadVideoResponse uploadVideo(MultipartFile multipartFile) {
        String videoUrl = s3service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);

        var savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());

    }
    public VideoDto editVideo(VideoDto videoDto) {
    var savedVideo = getVideoById((videoDto.getId()));
    savedVideo.setTitle(videoDto.getTitle());
    savedVideo.setDescription(videoDto.getDescription());
    savedVideo.setTags(videoDto.getTags());
    savedVideo.setVideoStatus(videoDto.getVideoStatus());

    videoRepository.save(savedVideo);
    return videoDto;

    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        var savedVideo = getVideoById(videoId);

        String thumbnailUrl =  s3service.uploadFile(file);

        savedVideo.setThumbnailUrl(thumbnailUrl);
        videoRepository.save(savedVideo);
        return thumbnailUrl;
    }

    Video getVideoById(String videoId){
        return videoRepository.findById(videoId).orElseThrow( () -> new IllegalArgumentException("Cannot Find video by id - " + videoId));
    }


    public VideoDto getVideoDetails(String videoId) {
        Video savedVideo = getVideoById(videoId);

        increaseVideoCount(savedVideo);
        userService.addVideoToHistory(videoId);

        return mapToVideoDto(savedVideo);
    }

    private void increaseVideoCount(Video savedVideo) {
        savedVideo.incrementViewCount();
        videoRepository.save(savedVideo);
    }

    public VideoDto likeVideo(String videoId) {
        Video videoById = getVideoById(videoId);

        if (userService.ifLikedVideo(videoId)) {
            videoById.decrementLikes();
            userService.removeFromLikedVideos(videoId);
        } else if (userService.ifDisLikedVideo(videoId)) {
            videoById.decrementDisLikes();
            userService.removeFromDislikedVideos(videoId);
            videoById.incrementLikes();
            userService.addToLikedVideos(videoId);
        } else {
            videoById.incrementLikes();
            userService.addToLikedVideos(videoId);
        }

        videoRepository.save(videoById);

        return mapToVideoDto(videoById);
    }

    public VideoDto disLikeVideo(String videoId) {
        Video videoById = getVideoById(videoId);

        if (userService.ifDisLikedVideo(videoId)) {
            videoById.decrementDisLikes();
            userService.removeFromDislikedVideos(videoId);
        } else if (userService.ifLikedVideo(videoId)) {
            videoById.decrementLikes();
            userService.removeFromLikedVideos(videoId);
            videoById.incrementDisLikes();
            userService.addToDisLikedVideos(videoId);
        } else {
            videoById.incrementDisLikes();
            userService.addToDisLikedVideos(videoId);
        }

        videoRepository.save(videoById);

        return mapToVideoDto(videoById);
    }

    private VideoDto mapToVideoDto(Video videoById) {
        VideoDto videoDto = new VideoDto();
        videoDto.setVideoUrl(videoById.getVideoUrl());
        videoDto.setThumbnailUrl(videoById.getThumbnailUrl());
        videoDto.setId(videoById.getId());
        videoDto.setTitle(videoById.getTitle());
        videoDto.setDescription(videoById.getDescription());
        videoDto.setTags(videoById.getTags());
        videoDto.setVideoStatus(videoById.getVideoStatus());
        videoDto.setLikeCount(videoById.getLikes().get());
        videoDto.setDislikeCount(videoById.getDisLikes().get());
        videoDto.setViewCount(videoById.getViewCount().get());
        return videoDto;
    }

    public void addComment(String videoId, CommentDto commentDto) {
        Video video = getVideoById(videoId);
        Comment comment = new Comment();
        comment.setText(commentDto.getCommentText());
        comment.setAuthorId(commentDto.getAuthorId());
        video.addComment(comment);

        videoRepository.save(video);
    }
    public void deleteComment(String videoId){
        Video video = getVideoById(videoId);
        List<Comment> commentList = video.getCommentList();
        Comment comment = commentList.get(commentList.size()-1);
        String author = comment.getAuthorId();
        System.out.println(comment);
        System.out.println(author);
        if (author.equals(author)){
            commentList.remove(commentList.size()-1);
        } else {
            System.out.println("false");
        }
        System.out.println(commentList);
        videoRepository.save(video);
    }

    public List<CommentDto> getAllComments(String videoId) {
        Video video = getVideoById(videoId);
        List<Comment> commentList = video.getCommentList();

        return commentList.stream().map(this::mapToCommentDto).collect(Collectors.toList());
    }

    private CommentDto mapToCommentDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setCommentText(comment.getText());
        commentDto.setAuthorId(comment.getAuthorId());
        return commentDto;
    }

    public List<VideoDto> getAllVideos() {
        return videoRepository.findAll().stream().map(this::mapToVideoDto).collect(Collectors.toList());
    }


    public List<VideoDto> getVideoList(Set<String> videoList){
        return videoRepository.findByIdIn(videoList).stream().map(this::mapToVideoDto).collect(Collectors.toList());
    }

}
