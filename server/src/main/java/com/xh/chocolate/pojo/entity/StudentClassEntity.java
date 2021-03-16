package com.xh.chocolate.pojo.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="StudentClass")
@EntityListeners(AuditingEntityListener.class)
public class StudentClassEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    private Integer specialtyId;
    private String classNumber;

}
