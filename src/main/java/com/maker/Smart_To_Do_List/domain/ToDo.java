package com.maker.Smart_To_Do_List.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;


@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "todo", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "todo_id")})
public class ToDo extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id", unique = true)
    private long todoId;

    @NotNull
    @Column(name = "todo_title",nullable = false)
    private String todoTitle;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "toDoList_id")
    private ToDoList toDoList;

}