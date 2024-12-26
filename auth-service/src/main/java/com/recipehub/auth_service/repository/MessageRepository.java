package com.recipehub.auth_service.repository;

import com.recipehub.auth_service.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m " +
            "WHERE m.chatRoom.id = :roomId " +
            "ORDER BY m.timestamp DESC")
    Page<Message> findByRoomId(@Param("roomId") Long roomId, Pageable pageable);

    @Query("SELECT m FROM Message m " +
            "WHERE m.chatRoom.id = :roomId " +
            "AND m.timestamp < :timestamp " +
            "ORDER BY m.timestamp DESC")
    Page<Message> findByRoomIdAndTimestampBefore(
            @Param("roomId") Long roomId,
            @Param("timestamp") LocalDateTime timestamp,
            Pageable pageable);

    @Query("SELECT COUNT(m) FROM Message m " +
            "WHERE m.chatRoom.id = :roomId AND m.timestamp > :since")
    long countNewMessages(@Param("roomId") Long roomId, @Param("since") LocalDateTime since);

    void deleteByChatRoomId(Long chatRoomId);

}