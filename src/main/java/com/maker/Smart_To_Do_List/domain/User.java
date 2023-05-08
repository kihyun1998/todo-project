package com.maker.Smart_To_Do_List.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "user", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "user_id")})
public class User {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true)
    private Long userId;

    @NotNull
    @Column(name = "login_id", unique = true)
    private String loginId;

    @NotNull
    @Column(name = "login_pw")
    private String loginPw;

    @NotNull
    @Column(name = "userName",unique = true)
    private String userName;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @NotNull
    @Column(name = "user_email",unique = true)
    private String userEmail;
}
