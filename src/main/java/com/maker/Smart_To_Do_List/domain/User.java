package com.maker.Smart_To_Do_List.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "login_id",nullable = false)
    private String loginId;

    @Column(name = "login_pw",nullable = false)
    private String loginPw;

    @Column(name = "userName")
    private String userName;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "user_email")
    private String userEmail;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user",cascade = CascadeType.ALL)
    private List<User> todoLists;

}
