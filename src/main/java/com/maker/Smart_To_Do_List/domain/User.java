package com.maker.Smart_To_Do_List.domain;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "user", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "user_id")})
public class User extends BaseTimeEntity{

    @Id
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

    @NotNull
    @Column(name = "user_email",unique = true)
    private String userEmail;
//
//    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
//    private List<ToDoList> toDoLists = new ArrayList<>();
}
