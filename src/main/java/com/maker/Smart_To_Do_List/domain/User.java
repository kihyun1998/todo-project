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

    /***
     ASC_DATE : 생성 날짜 오름차순
     DESC_DATE : 생성 날자 내림차순
     ASC_NAME : 이름 오름차순
     DESC_NAME : 이름 내림차순
     ***/
    @Column(name = "sort_by")
    @ColumnDefault("ASC_Date")
    private String sortBy;
}
