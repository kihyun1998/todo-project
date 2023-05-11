package com.maker.Smart_To_Do_List.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    @Column(name = "toDo_id", unique = true, nullable = false)
    private long toDoId;

    @NotNull
    @Column(name = "toDo_title")
    private String todoTitle;

    @NotNull
    @Column(name = "estimated_time")
    private long estimatedTime;

    @NotNull
    @Column(name = "deadline")
    private LocalDateTime deadline;

    @NotNull
    @Column(name = "difficulty")
    private int difficulty;

    @NotNull
    @Column(name = "importance")
    private int importance;

    @NotNull
    @Column(name = "status")
    private int status;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private ToDoList toDoList;

}