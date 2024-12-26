package com.recipehub.auth_service.entity;

import com.recipehub.auth_service.Enum.MessageStatus;
import com.recipehub.auth_service.Enum.MessageType;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "messages")
@EntityListeners(AuditingEntityListener.class)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String fileUrl;

    @Column
    @Enumerated(EnumType.STRING)
    private MessageStatus status = MessageStatus.SENT;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    @CreatedDate
    private LocalDateTime timestamp;

    @Version
    private Long version;
}
