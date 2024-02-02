package com.maker.Smart_To_Do_List.domain;

import com.maker.Smart_To_Do_List.enums.Gender;
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
    @Column(name = "user_id", unique = true)
    private String userId;

    @NotNull
    @Column(name = "login_id", unique = true)
    private String loginId;

    @NotNull
    @Column(name = "login_pw")
    private String loginPw;

    @NotNull
    @Column(name = "user_name", unique = true)
    private String userName;

    @NotNull
    @Column(name = "user_email", unique = true)
    private String userEmail;

    @Column(name = "user_age")
    private Integer userAge;

    @Column(name = "user_job")
    private String userJob;

    @Column(name = "user_gender")
    private Gender userGender;

    @Column(name = "main_list")
    private String mainToDoListId;


    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,orphanRemoval=true)
    private List<ToDoList> toDoLists;

    public void addToDoList(ToDoList toDoList){
        toDoLists.add(toDoList);
        toDoList.setUser(this);
    }
}
