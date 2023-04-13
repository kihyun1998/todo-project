package com.maker.Smart_To_Do_List.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "toDoList", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "toDoList_id")})
public class ToDoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="toDoList_id", unique = true, nullable = false)
    private Long listId;

    @Column(name = "toDoList_name", nullable = false)
    private String listName;

    @Column(name = "created_at")
    private Date createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "toDoList")
    private List<ToDo> todos;

}