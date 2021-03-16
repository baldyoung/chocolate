package com.xh.chocolate.pojo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Specialty")
@EntityListeners(AuditingEntityListener.class)
public class SpecialtyEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column(length = 10)
    private String specialtyNumber;
    @Column(length = 20)
    private String specialtyName;
    @Column(length = 1000)
    private String specialtyInfo;
    @CreatedDate
    private Date createDateTime;
    @LastModifiedDate
    private Date updateDateTime;

    @Override
    public String toString() {
        return "SpecialtyEntity{" +
                "id=" + id +
                ", specialtyNumber='" + specialtyNumber + '\'' +
                ", specialtyName='" + specialtyName + '\'' +
                ", specialtyInfo='" + specialtyInfo + '\'' +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSpecialtyNumber() {
        return specialtyNumber;
    }

    public void setSpecialtyNumber(String specialtyNumber) {
        this.specialtyNumber = specialtyNumber;
    }

    public String getSpecialtyName() {
        return specialtyName;
    }

    public void setSpecialtyName(String specialtyName) {
        this.specialtyName = specialtyName;
    }

    public String getSpecialtyInfo() {
        return specialtyInfo;
    }

    public void setSpecialtyInfo(String specialtyInfo) {
        this.specialtyInfo = specialtyInfo;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }
}
