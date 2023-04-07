package com.maker.Smart_To_Do_List.domain;

import lombok.*;

import javax.persistence.*;


@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "todo", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "todo_id")})
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id", unique = true, nullable = false)
    private long todoId;

    @Column(name = "todo_title",nullable = false)
    private String todoTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private ToDoList toDoList;

}
